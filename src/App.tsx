import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import Form from "@/components/Form/Form";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";
import useForm from "@/hooks/useForm";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";
import transformAddress from "./core/models/address";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const { values, onFieldChange, reset, setValue } = useForm({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  const handleSelectedAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setValue("selectedAddress", e.target.value);

  /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
   * - Example URL of API: ${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=1345&streetnumber=350
   * - Ensure you provide a BASE URL for api endpoint for grading purposes!
   * - Handle errors if they occur
   * - Handle successful response by updating the `addresses` in the state using `setAddresses`
   * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
   * - Ensure to clear previous search results on each click
   * - Bonus: Add a loading state in the UI while fetching addresses
   */
  const [loadingAddresses, setLoadingAddresses] = React.useState(false);
  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setAddresses([]);
    setValue("selectedAddress", "");

    // Basic front-end validation to mirror BE
    if (!values.postCode || !values.houseNumber) {
      setError("Postcode and street number fields mandatory!");
      return;
    }
    if (values.postCode.length < 4) {
      setError("Postcode must be at least 4 digits!");
      return;
    }

    let base = process.env.NEXT_PUBLIC_URL || "";
    if (!base && typeof window !== "undefined") {
      // zh: 无环境变量时使用当前站点；en: fallback to current origin when env not set
      base = window.location.origin;
    }
    const url = `${base}/api/getAddresses?postcode=${encodeURIComponent(
      values.postCode
    )}&streetnumber=${encodeURIComponent(values.houseNumber)}`;

    try {
      setLoadingAddresses(true);
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.errormessage || "Unknown error");
        return;
      }
      const details = Array.isArray(data?.details) ? data.details : [];
      // zh: 保留后端返回的每条地址自带的 houseNumber，避免 3 条结果相同
      // en: Keep each item's original houseNumber from BE to avoid 3 identical results
      const transformed: AddressType[] = details.map((d: any) =>
        transformAddress(d)
      );
      setAddresses(transformed);
    } catch (err) {
      setError("Failed to fetch addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  /** TODO: Add basic validation to ensure first name and last name fields aren't empty
   * Use the following error message setError("First name and last name fields mandatory!")
   */
  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.firstName || !values.lastName) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!values.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === values.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName: values.firstName, lastName: values.lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <Form
          label="🏠 Find an address"
          loading={loadingAddresses}
          formEntries={[
            {
              name: "postCode",
              placeholder: "Post Code",
              extraProps: { value: values.postCode, onChange: onFieldChange },
            },
            {
              name: "houseNumber",
              placeholder: "House number",
              extraProps: { value: values.houseNumber, onChange: onFieldChange },
            },
          ]}
          onFormSubmit={handleAddressSubmit}
          submitText="Find"
          footer={
            <Button
              variant="secondary"
              onClick={() => {
                setError(undefined);
                setAddresses([]);
                reset();
              }}
            >
              Clear all fields
            </Button>
          }
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {values.selectedAddress && (
          <Form
            label="✏️ Add personal info to address"
            formEntries={[
              {
                name: "firstName",
                placeholder: "First name",
                extraProps: { value: values.firstName, onChange: onFieldChange },
              },
              {
                name: "lastName",
                placeholder: "Last name",
                extraProps: { value: values.lastName, onChange: onFieldChange },
              },
            ]}
            onFormSubmit={handlePersonSubmit}
            submitText="Add to addressbook"
          />
        )}

        <ErrorMessage message={error} />

        
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
