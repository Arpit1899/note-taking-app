import React, { useState } from "react";
import "./App.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [inputValue, setInputValue] = useState("Type Here");
  const [listItems, setListItems] = useState([]);
  const [isRotated, setIsRotated] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const promptText = `With this text create a cool note max 20 tokens:${inputValue}`;
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer {OpenAI API Key}",
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: promptText,
          temperature: 0,
          max_tokens: 30,
        }),
      });
      const data = await response.json();
      console.log(data);
      setListItems([...listItems, data.choices[0].text]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (item) => {
    const newListItems = listItems.filter((i) => i !== item);
    setListItems(newListItems);
  };

  const handleMouseEnter = () => {
    setIsRotated(true);
  };

  const handleMouseLeave = () => {
    setIsRotated(false);
  };

  return (
    <div style={styles.page}>
      <p style={styles.title}>
        <FontAwesomeIcon
          icon={faCashRegister}
          style={{ marginRight: "60px" }}
        />
        Not your generic note taking app!
      </p>

      <hr
        style={{
          color: "white",
          backgroundColor: "white",
          height: 0,
          width: "80%",
        }}
      />
      <div style={styles.container}>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            onClick={() => setInputValue("")}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {/* <div style={styles.line}></div> */}
        </div>

        <div style={styles.listContainer}>
          {listItems.map((item) => (
            <div key={item} style={styles.listItem}>
              <div style={styles.itemText}>{item}</div>

              <button
                style={{
                  ...styles.button,
                  ...(isRotated ? styles.rotate : null),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRemoveItem(item)}
              >
                <FontAwesomeIcon icon={faTimes} size="2x" color="black" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "white",
  },
  title: {
    fontFamily: "'Courier New', monospace",
    fontSize: "2rem",
    marginTop: "2%",
    marginLeft: "-28%",
    color: "black",
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "70%",
    // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    padding: "20px",
  },

  inputContainer: {
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
    // boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    height: "40px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "nowrap",
    fontSize: "26px",
    lineHeight: "1.2",
    borderRight: "0.15em solid #fff",
    letterSpacing: "0.15em",
    fontFamily: "'Courier New', monospace",
    border: "none",
    outline: "none",
    paddingLeft: "20px",
    paddingRight: "20px",
    // boxShadow: "inset 0px 1px 2px rgba(0,0,0,0.1)",
  },
  line: {
    width: 100,
    height: "1px",
    backgroundColor: "#ccc",
  },
  listContainer: {
    width: "100%",
    height: 500,
    fontFamily: "'Courier New', monospace",
    fontSize: "1.5rem",
    textAlign: "center",
    marginTop: "0%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    scrollbarWidth: "none",
    background: "white",
    padding: "10px",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    // boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
  listItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "white",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  },
  itemText: {
    flex: 1,
    fontWeight: "bold",
    color: "#333",
    overflowX: "scroll",
    display: "inline-block",

    whiteSpace: "nowrap",
    fontSize: "16px",
    lineHeight: "1.2",
    borderRight: "0.15em solid #fff",
    letterSpacing: "0.15em",
    fontFamily: "'Courier New', monospace",
  },
  button: {
    transition: "transform 0.2s ease-in-out",
    background: "none",
    border: "none",
  },
  rotate: {
    transform: "rotate(90deg)",
  },
};

export default App;
