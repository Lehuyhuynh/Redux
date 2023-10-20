import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { addStudent, removeStudent } from "./store/reducers/Student";
export default function Student() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      phoneNumber: "",
      subject: "",
    },
  });
  const dispatch = useDispatch();
  const studentStore = useSelector((state) => state.student);

  const onSubmit = (values) => {
    const payload = { ...values, id: uuidv4() };
    dispatch(addStudent(payload));
  };
  const onRemove = (id) => {
    dispatch(removeStudent(id));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <p>tên danh bạ:</p>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" placeholder="user name" />
          )}
        />
        <p>số điện thoại:</p>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" placeholder="phone number" />
          )}
        />

        <p>môn hoc :</p>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" placeholder="subject" />
          )}
        />

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>phone</th>
              <th>Subject</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {studentStore.students.map((phonebook, index) => (
              <tr key={index}>
                <td>{phonebook.id}</td>
                <td>{phonebook.userName}</td>
                <td>{phonebook.phoneNumber}</td>
                <td>{phonebook.subject}</td>
                <td>
                  <button onClick={() => onRemove(phonebook.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
