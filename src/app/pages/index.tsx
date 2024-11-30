'use client';
import { useEffect,useState } from "react";

type Lesson = {
  subject: string;
  room: string;
  teacher: string;
};

type Timetable = Lesson[][];

export default function Home() {
  const defaultTimetable: Timetable = Array(5).fill(
    Array(5).fill({ subject: "", room: "", teacher: "" })
  );

  const [timetable, setTimetable] = useState<Timetable>(defaultTimetable);

  // Load timetable from localStorage on first render
  useEffect(() => {
    const storedTimetable = localStorage.getItem("school-timetable");
    if (storedTimetable) {
      setTimetable(JSON.parse(storedTimetable));
    }
  }, []);

  // Save timetable to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("school-timetable", JSON.stringify(timetable));
  }, [timetable]);

  const handleChange = (
    dayIndex: number,
    lessonIndex: number,
    field: "subject" | "room" | "teacher",
    value: string
  ) => {
    const newTimetable = [...timetable];
    newTimetable[dayIndex][lessonIndex] = {
      ...newTimetable[dayIndex][lessonIndex],
      [field]: value,
    };
    setTimetable(newTimetable);
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">School Timetable</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {weekDays.map(
          (day, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold text-center mb-4">{day}</h2>
              {timetable[dayIndex].map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="mb-4">
                  {/* Insert Break After the Second Lesson */}
                  {lessonIndex === 2 && (
                    <p className="text-center bg-yellow-200 rounded p-1 mb-2">
                      Break
                    </p>
                  )}

                  {/* Insert Lunchtime After the Fourth Lesson */}
                  {lessonIndex === 4 && (
                    <p className="text-center bg-blue-200 rounded p-1 mb-2">
                      Lunchtime
                    </p>
                  )}

                  {/* Lesson Input */}
                  <div className="p-2 border rounded bg-gray-50">
                    <h3 className="font-bold mb-2">Lesson {lessonIndex + 1}</h3>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={lesson.subject}
                      onChange={(e) =>
                        handleChange(dayIndex, lessonIndex, "subject", e.target.value)
                      }
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Room Number"
                      value={lesson.room}
                      onChange={(e) =>
                        handleChange(dayIndex, lessonIndex, "room", e.target.value)
                      }
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Teacher Name"
                      value={lesson.teacher}
                      onChange={(e) =>
                        handleChange(dayIndex, lessonIndex, "teacher", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}