'use client';
import { useEffect,useState } from "react";

export default function Home() {
  const defaultTimetable = [
    ["", "", "", "", ""], // Monday (5 lessons)
    ["", "", "", "", ""], // Tuesday
    ["", "", "", "", ""], // Wednesday
    ["", "", "", "", ""], // Thursday
    ["", "", "", "", ""], // Friday
  ];

  const [timetable, setTimetable] = useState<string[][]>(defaultTimetable);

  // Load timetable from localStorage on first render
  useEffect(() => {
    const storedTimetable = localStorage.getItem("school-timetable");
    if (storedTimetable) {
      setTimetable(JSON.parse(storedTimetable));
    }
  }, []);

    //   save to local storage whenever there are changes
    useEffect(() => {
        localStorage.setItem("school-timetable", JSON.stringify(timetable));
    }, [timetable]);


  const handleChange = (dayIndex: number, lessonIndex: number, value: string) => {
    const newTimetable = [...timetable];
    newTimetable[dayIndex][lessonIndex] = value;
    setTimetable(newTimetable);
  };

  const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">School Timetable</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        {daysOfTheWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-center mb-4">{day}</h2>
            
            {timetable[dayIndex].map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="mb-2">

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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    Lesson {lessonIndex + 1}
                  </span>
                  <input
                    type="text"
                    placeholder={`Enter subject`}
                    value={lesson}
                    onChange={(e) =>
                      handleChange(dayIndex, lessonIndex, e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}