import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiPlus, BiMinus } from "react-icons/bi";

function App() {
  const [students, setStudents] = useState([]);
  const [filterStudent, setFilterStudent] = useState([]);
  const [openTab, setOpenTab] = useState({
    open: false,
    index: undefined,
  });

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((response) => {
        setStudents(response.data.students);
        setFilterStudent(response.data.students.slice());
      });
  }, []);

  const addTag = (student, e) => {
    if (e.key === "Enter") {
      if (student.tags) {
        student.tags.push(e.target.value);
      } else {
        student.tags = [e.target.value];
      }
      setStudents([...students]);
      e.target.value = "";
    }
  };

  return (
    <div className="App">
      <div className="innerApp">
        <input
          className="input"
          type="text"
          placeholder="Search by name"
          onChange={(e) => {
            setFilterStudent(
              students.filter((val) => {
                if (e.target.value === "") {
                  return val;
                } else if (
                  val.firstName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.lastName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                ) {
                  return val;
                }
              })
            );
          }}
        />
        <input
          className="input"
          type="text"
          placeholder="Search by tag"
          onChange={(e) => {
            setFilterStudent(
              students.filter((val) => {
                if (e.target.value === "") {
                  return val;
                } else if (
                  val.tags &&
                  val.tags.find((f) =>
                    f.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                ) {
                  return val;
                }
              })
            );
          }}
        />
        {filterStudent.map((value, index) => {
          return (
            <div className="studentProfile" key={index}>
              <div className="studentProfileTop">
                <img className="studentPic" src={value.pic} alt="" />
                <div className="studentInfo">
                  <div className="studentFullName">
                    {value.firstName} {value.lastName}
                  </div>
                  <div className="studentEmail">Email: {value.email}</div>
                  <div className="studentCompany">Company: {value.company}</div>
                  <div className="studentSkill">Skill: {value.skill}</div>
                  <div className="studentGrade">
                    Grade Average:
                    {(Number(value.grades[0]) +
                      Number(value.grades[1]) +
                      Number(value.grades[2]) +
                      Number(value.grades[3]) +
                      Number(value.grades[4]) +
                      Number(value.grades[5]) +
                      Number(value.grades[6]) +
                      Number(value.grades[7])) /
                      8}
                    %
                  </div>
                </div>
                <button
                  className="iconButton"
                  onClick={(e) => {
                    if (index === openTab.index) {
                      setOpenTab({
                        open: !openTab.open,
                        index: index,
                      });
                    } else {
                      setOpenTab({
                        open: true,
                        index: index,
                      });
                    }
                  }}
                >
                  {openTab.open && openTab.index === index ? (
                    <BiMinus className="icon" />
                  ) : (
                    <BiPlus className="icon" />
                  )}
                </button>
              </div>
              <div className="gradesListWhole">
                {openTab.open && openTab.index === index ? (
                  <div className="gradesList">
                    <div>Test 1: {value.grades[0]}%</div>
                    <div>Test 2: {value.grades[1]}%</div>
                    <div>Test 3: {value.grades[2]}%</div>
                    <div>Test 4: {value.grades[3]}%</div>
                    <div>Test 5: {value.grades[4]}%</div>
                    <div>Test 6: {value.grades[5]}%</div>
                    <div>Test 7: {value.grades[6]}%</div>
                    <div>Test 8: {value.grades[7]}%</div>
                  </div>
                ) : (
                  ""
                )}
                <div className="tags">
                  {value.tags &&
                    value.tags.map((t, index) => {
                      if (t.length < 1) {
                        return <></>;
                      }
                      return (
                        t && (
                          <div className="tag" key={index}>
                            {t}
                          </div>
                        )
                      );
                    })}
                </div>
                <input
                  type="text"
                  placeholder="Add a tag"
                  className="tagInput"
                  onKeyDown={(e) => {
                    addTag(value, e);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
