import {
    useRef,
    useState,
  } from "react";
  
  import ReactEmailEditor
  from "react-email-editor";
  
  import API from "../services/api";
  
  const EmailEditor =
    ReactEmailEditor.default ||
    ReactEmailEditor;
  
  const TemplateEditor = () => {
  
    const emailEditorRef =
      useRef(null);
  
    const [name, setName] =
      useState("");
  
    const [category, setCategory] =
      useState("");
  
    const saveTemplate = () => {
  
      const editor =
        emailEditorRef.current?.editor;
  
      if (!editor) {
  
        alert("Editor not loaded");
  
        return;
      }
  
      editor.exportHtml(
        async (data) => {
  
          const {
            design,
            html,
          } = data;
  
          try {
  
            const token =
              localStorage.getItem(
                "token"
              );
  
            console.log(token);
  
            await API.post(
              "/templates",
              {
                name,
                category,
                design,
                html,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );
  
            alert(
              "Template Saved"
            );
  
          } catch (error) {
  
            console.log(error);
  
            alert(
              "Save failed"
            );
  
          }
  
        }
      );
    };
  
    return (
  
      <div>
  
        <div
          style={{
            padding: "10px",
            background: "#eee",
          }}
        >
  
          <input
            type="text"
            placeholder="Template Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />
  
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            style={{
              marginLeft: "10px",
            }}
          />
  
          {/* SAVE TEMPLATE BUTTON */}
  
          <button
            onClick={saveTemplate}
            style={{
              marginLeft: "10px",
            }}
          >
            Save Template
          </button>
  
          {/* EXPORT HTML BUTTON */}
  
          <button
            onClick={() => {
  
              const editor =
                emailEditorRef.current?.editor;
  
              if (!editor) {
  
                alert(
                  "Editor not loaded"
                );
  
                return;
              }
  
              editor.exportHtml(
                (data) => {
  
                  console.log(
                    data.html
                  );
  
                  alert(
                    "HTML exported.\nCheck console."
                  );
  
                }
              );
  
            }}
            style={{
              marginLeft: "10px",
            }}
          >
            Export HTML
          </button>
  
          {/* PERSONALIZATION TAGS BUTTON */}
  
          <button
            onClick={() => {
  
              const editor =
                emailEditorRef
                .current
                ?.editor;
  
              if (!editor) {
  
                alert(
                  "Editor not loaded"
                );
  
                return;
              }
  
              editor.addEventListener(
                "design:updated",
                () => {}
              );
  
              alert(
                "Use tags like:\n\n{{first_name}}\n{{email}}\n{{company}}"
              );
  
            }}
            style={{
              marginLeft: "10px",
            }}
          >
            Personalization Tags
          </button>
  
        </div>
  
        <div
          style={{
            height: "90vh",
          }}
        >
  
          <EmailEditor
            ref={emailEditorRef}
          />
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default TemplateEditor;