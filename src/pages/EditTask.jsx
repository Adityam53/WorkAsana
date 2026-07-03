import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../contexts/TaskContext";
import { useAuthContext } from "../contexts/AauthContext";
import { toast } from "react-toastify";

const EditTask = () => {
  const { taskId } = useParams();
  const { token } = useAuthContext();
  const { updateTask, getTaskById } = useTaskContext();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTask();
    }
  }, [taskId, token]);

  const handleSubmit = async (formData) => {
    try {
      await updateTask(taskId, formData);

      navigate(`/tasks/${taskId}`);
    } catch (err) {
      console.error(err);
      toast.error("Unable to update task.");
    }
  };

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (!task) {
    return <div className="center">Task not found.</div>;
  }

  return (
    <main className="row">
      <TaskForm
        initialData={task}
        heading="Edit Task"
        subHeading="Update task details."
        buttonText="Update Task"
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default EditTask;
