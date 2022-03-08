import React from "react";
import AppContainer from "./AppContainer";
import Form from "./components/Form";
import FormsList from "./components/FormsList";
import Header from "./Header";

function App() {
  const [page, setPage] = React.useState("HOME");
  const [newForm, setNewForm] = React.useState(false);
  const openForm = (isNew: boolean = false) => {
    setPage("FORM");
    if (isNew) setNewForm(true);
  };
  const closeForm = () => setPage("HOME");
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={`Welcome to Lesson ${
            4 + 2
          } of #react-typescript with #tailwindcss`}
        />
        {page === "HOME" ? (
          <>
            <button
              onClick={() => setPage("FORMSLIST")}
              className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
            >
              All forms
            </button>
            <button
              onClick={() => openForm(false)}
              className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
            >
              Go to Form
            </button>
          </>
        ) : page === "FORMSLIST" ? (
          <FormsList newFormCB={openForm} />
        ) : (
          <Form
            setNewFormCB={setNewForm}
            closeFormCB={closeForm}
            isNew={newForm}
          />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
