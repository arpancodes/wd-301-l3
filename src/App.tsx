import React from "react";
import AppContainer from "./AppContainer";
import Form from "./components/Form";
import FormsList from "./components/FormsList";
import Header from "./Header";

function App() {
  const [formId, setFormId] = React.useState(-1);
  const openForm = (id: number) => setFormId(id);
  const closeForm = () => setFormId(-1);
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={`Welcome to Lesson ${
            4 + 2
          } of #react-typescript with #tailwindcss`}
        />
        {formId === -1 ? (
          <FormsList openFormCB={openForm} />
        ) : (
          <Form formId={formId} closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
