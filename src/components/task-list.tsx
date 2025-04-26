"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CheckCircle, Circle, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { TimePicker } from "@/components/ui/time-picker";

interface Task {
  id: string;
  name: string;
  dueDate?: Date;
  dueTime?: string;
  completed: boolean;
}

interface TaskListProps {
  listName: string;
}

const TaskList: React.FC<TaskListProps> = ({ listName }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), name: newTask, dueDate: selectedDate, dueTime: selectedTime, completed: false },
      ]);
      setNewTask("");
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" side="bottom">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <TimePicker value={selectedTime} setValue={setSelectedTime} />
        <Button onClick={addTask}><Plus className="w-4 h-4 mr-2" /> Add Task</Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <button onClick={() => toggleComplete(task.id)} className="mr-2">
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                {task.name}
              </span>
            </div>
            <div>
              {task.dueDate && (
                <div className="text-sm text-muted-foreground">
                  Due Date: {task.dueDate.toLocaleDateString()}
                </div>
              )}
              {task.dueTime && (
                <div className="text-sm text-muted-foreground">
                  Due Time: {task.dueTime}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
