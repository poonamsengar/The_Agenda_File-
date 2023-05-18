import React, { useEffect, useState } from "react";
import "./style.css";

const getlocalStorage = () => {
  const list = localStorage.getItem("mytodolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getlocalStorage());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const mynewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, mynewInputData]);
      setInputData("");
    }
  };

  /* ----------------------------------------------------------------- */
  /* Edit  Your Item */

  const EditItem = (index) => {
    const itemEdit = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(itemEdit.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  /* ----------------------------------------------------------------- */
  /* Delete  Your Item */

  const deletFun = (index) => {
    const updateItem = items.filter((currEle) => {
      return currEle.id !== index;
    });
    setItems(updateItem);
  };
  /* ----------------------------------------------------------------- */
  /* Remove All todo Data List Your Item */
  const RemoveAll = () => {
    setItems([]);
  };

  /* ----------------------------------------------------------------- */
  /* Local Storage */
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="" />
            <figcaption>Add Your List Here 📁</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ write here..."
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((currEle) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => EditItem(currEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deletFun(currEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={RemoveAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
