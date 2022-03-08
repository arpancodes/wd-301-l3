import React, { useEffect, useRef } from "react";
import { formData, formField } from "./model";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

const getLocalForms: () => formData[] = () => {
  const localForms = localStorage.getItem("forms");
  console.log("getLocalForms: ", JSON.parse(localForms as any));
  if (localForms) {
    return JSON.parse(localForms);
  } else {
    return [];
  }
};

const intialState: (isNew: boolean) => formData = (isNew) => {
  const localForms = getLocalForms();
  console.log("Initial State: ", localForms);
  if (localForms.length > 0 && !isNew) {
    return localForms[0];
  }

  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: formFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (formData: formData[]) => {
  console.log("saveLocalForms: ", formData);
  localStorage.setItem("forms", JSON.stringify(formData));
  console.log("AFTER SAVING TO LOCALSTORAGE", getLocalForms());
};

const saveFormData = (formData: formData) => {
  const localForms = getLocalForms();
  console.log("saveFormData: ", formData);
  console.log(localForms);
  const updatedForms = localForms.map((form) => {
    return form.id === formData.id ? formData : form;
  });
  saveLocalForms(updatedForms);
};

export default function Form(props: {
  closeFormCB: () => void;
  setNewFormCB: (x: boolean) => void;
  isNew: boolean;
}) {
  const initialState = intialState(props.isNew);
  const [formState, setFormState] = React.useState<formData>(initialState);
  const [newField, setNewField] = React.useState({ title: "", type: "text" });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = `Form Builder`;
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
      props.setNewFormCB(false);
    };
  }, [props]);

  useEffect(() => {
    console.log("Form State: ", formState);
    const timeout = setTimeout(() => {
      saveFormData(formState);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [formState]);

  const clearFormCB = () => {
    setFormState({
      ...formState,
      formFields: formState.formFields.map((field) => ({
        ...field,
        value: "",
      })),
    });
  };

  return (
    <div className="flex flex-col  items-center">
      <input
        type="text"
        value={formState.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFormState({ ...formState, title: e.target.value });
        }}
        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
        placeholder="Form Title"
        ref={titleRef}
      />
      <div className="flex w-full">
        <button
          onClick={props.closeFormCB}
          className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
        >
          Close Form
        </button>
        <button
          onClick={clearFormCB}
          className="bg-gray-600 text-white rounded-lg p-2 m-2 w-full"
        >
          Clear Form
        </button>
      </div>
      {formState.formFields.map((field) => (
        <React.Fragment key={field.id}>
          <div className="flex w-full justify-between items-end">
            <span className="w-full text-lg px-2">{field.label}</span>
            <button
              className="bg-blue-600 text-white rounded-lg p-2 m-2"
              onClick={() =>
                setFormState(() => {
                  const newState = formState.formFields.filter(
                    (item) => item.id !== field.id
                  );
                  return { ...formState, formFields: newState };
                })
              }
            >
              Remove
            </button>
          </div>
          <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
            type={field.type}
            value={field.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormState({
                ...formState,
                formFields: formState.formFields.map((item) => {
                  if (item.id === field.id) {
                    return { ...item, value: e.target.value };
                  }
                  return item;
                }),
              });
            }}
            placeholder={field.label}
          />
        </React.Fragment>
      ))}
      {/* Button to add Form Item */}
      <div className="flex w-full justify-between items-end">
        <input
          type="text"
          value={newField.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewField({ ...newField, title: e.target.value })
          }
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          placeholder="Add New Field"
        />
        <input
          type="text"
          value={newField.type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewField({ ...newField, type: e.target.value })
          }
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          placeholder="Add New Field"
        />

        <button
          className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
          onClick={() => {
            setFormState({
              ...formState,
              formFields: [
                ...formState.formFields,
                {
                  id: Number(new Date()),
                  label: newField.title,
                  value: "",
                  type: newField.type,
                },
              ],
            });
            setNewField({ title: "", type: "text" });
          }}
        >
          Add Field
        </button>
      </div>
      <button
        className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
        onClick={() => {
          saveFormData(formState);
        }}
      >
        Save
      </button>
    </div>
  );
}
