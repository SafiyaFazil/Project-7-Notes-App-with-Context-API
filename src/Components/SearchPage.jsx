import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrNotes } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, editNote } from "../Features/NotesSlice";
import "../index.css";


function SearchPage(props) {
  const [SearchInp, setSearchInp] = useState("");

  const DispBoxVal = useSelector((state) => state.NotesPageReducer);

  const [SearchList, setSearchList] = useState([]);

  console.log(DispBoxVal);
  console.log(SearchInp);

  const [editmode, setEditmode] = useState(false);
  const [editedTitle, setEditedtitle] = useState("");
  const [editedContent, setEditedcontent] = useState("");
  const [editId, setEditid] = useState("");

  const dispatch = useDispatch();

  const handleChangeSearch = (e) => {
    setSearchInp(e.target.value);

    console.log(SearchInp);
  };

  const handleSearchClick = () => {
    setSearchList(
      DispBoxVal.filter((obj) => {
        return obj.content1.toLowerCase().includes(SearchInp.toLowerCase());
      })
    );
    console.log(SearchList);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));

    setSearchList(
      DispBoxVal.filter((obj) => {
        return obj.content1.toLowerCase().includes(SearchInp.toLowerCase());
      })
    );
  };


  const handleEdit = (id) => {
    if (editmode == true) {
      setEditmode(false);
    } else {
      console.log(id);
      setEditmode(true);
      setEditid(id);

      DispBoxVal.map((obj) => {
        if (obj.id == id) {
          setEditedtitle(obj.content1);
          setEditedcontent(obj.content2);
          console.log(editedTitle);
          return obj;
        } else return obj;
      });
    }

    const contentInparr = useSelector((state) =>
      state.NotesPageReducer.map((obj) => {
        if (obj.id == id) {
          setEditedtitle(obj.content2);

          return obj;
        } else return obj;
      })
    );
  };


  const handleSave = () => {
    setEditmode(false);

    const editData = {
      id: editId,
      Econtent1: editedTitle,
      Econtent2: editedContent,
    };
    console.log(editData);

    dispatch(editNote(editData));

    setSearchList(
      DispBoxVal.filter((obj) => {
        return obj.content1.toLowerCase().includes(SearchInp.toLowerCase());
      })
    );

    setEditedtitle("");
    setEditedcontent("");
  };


  const handleCancel = () => {
    setEditmode(false);
  };

  return (
    <div>
      <h1 className="searchtxt mx-2 mt-3">SEARCH NOTES</h1>

      <div className=" col-10 col-sm-9 col-md-8 col-lg-8 mt-3 mx-4 d-flex ">
        <input
          onChange={(e) => handleChangeSearch(e)}
          value={SearchInp}
          type="text"
          className="form-control form-control-sm py-2"
          placeholder="search by title..."
        />

        <button onClick={handleSearchClick} className="btn  btn-primary mx-2">
          search
        </button>
      </div>

      <div className="display-container mt-5">
        <h3 className="mynotes">
          <GrNotes/>  Notes List
        </h3>

        {SearchList.length > 0 ? (
          <div className="card-container horizontal-card-list mt-1">
            {SearchList.map((BoxVal) => (
              <div key={BoxVal.id} className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4 className="addnotetxt"> {BoxVal.content1}</h4>

                    <div className="btnicons ">
                      <button
                        onClick={() => {
                          handleEdit(BoxVal.id);
                        }}
                      >
                        <BsPencil />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(BoxVal.id);
                        }}
                      >
                        <RiDeleteBin6Line />{" "}
                      </button>{" "}
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="addnotetxt"> {BoxVal.content2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No notes added</div>
        )}
      </div>

      {editmode ? (
        <div className="editBox">
          <input
            className="form-control form-control-sm"
            type="text"
            value={editedTitle}
            onChange={(e) => {
              setEditedtitle(e.target.value);
            }}
            placeholder="Edit title"
          />

          <textarea
            rows={4}
            className="form-control form-control-sm mt-3 mb-3"
            type="text"
            value={editedContent}
            onChange={(e) => {
              setEditedcontent(e.target.value);
            }}
            placeholder="Edit content"
          />

          <span>
            <button onClick={handleSave}>Save</button>
          </span>
          <span>
            <button onClick={handleCancel}>Cancel</button>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchPage;
