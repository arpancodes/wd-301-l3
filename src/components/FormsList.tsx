import React, { useState } from "react";
import { formData } from "./model";

const getLocalForms: () => formData[] = () => {
  const localForms = localStorage.getItem("forms");
  if (localForms) {
    return JSON.parse(localForms);
  } else {
    return [];
  }
};

const saveLocalForms = (formData: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(formData));
};

const FormsList = (props: { newFormCB: (isNew: boolean) => void }) => {
  const [localForms, _] = useState<formData[]>(() => getLocalForms());

  const deleteForm = (id: number) => {
    const updatedForms = localForms.filter((form) => form.id !== id);
    saveLocalForms(updatedForms);
  };

  return (
    <div>
      <button
        onClick={() => props.newFormCB(true)}
        className="bg-blue-600 text-white rounded-lg p-2 m-2"
      >
        New Form
      </button>
      {localForms.map((form) => (
        <div className="border px-2 py-3 flex justify-between" key={form.id}>
          <span>{form.title}</span>
          <div>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteForm(form.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormsList;
