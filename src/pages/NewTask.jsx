import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../contexts/TaskContext";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

const NewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskContext();

  const handleSubmit = async (formData) => {
    try {
      await addTask(formData);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      toast.error("Please fill all the fields.");
    }
  };

  return (
    <main className="row">
      <TaskForm
        heading="Create New Task"
        subHeading="Please enter task details."
        buttonText="Add Task"
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default NewTask;
