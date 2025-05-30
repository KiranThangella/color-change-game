import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const colorList = [
  { name: "Red", code: "danger" },
  { name: "Blue", code: "primary" },
  { name: "Green", code: "success" },
  { name: "Yellow", code: "warning" },
  { name: "Purple", code: "secondary" },
  { name: "Orange", code: "info" },
];

function App() {
  const [activeColors, setActiveColors] = useState(colorList);
  const [currentColor, setCurrentColor] = useState(colorList[0]);
  const [colorCounts, setColorCounts] = useState(() =>
    Object.fromEntries(colorList.map((c) => [c.name, 0]))
  );
  const [winners, setWinners] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Debug state
  console.log("App state:", {
    isRunning,
    currentColor: currentColor.name,
    activeColors: activeColors.map((c) => c.name),
    winners,
    colorCounts,
  });

  // Random color change every 3 seconds
  useEffect(() => {
    let intervalId;
    if (isRunning && activeColors.length > 0) {
      console.log("Starting interval for color change");
      intervalId = setInterval(() => {
        const randomColor =
          activeColors[Math.floor(Math.random() * activeColors.length)];
        console.log("Changing to color:", randomColor.name);
        handleColorChange(randomColor);
      }, 1000);
    }
    return () => {
      console.log("Clearing interval");
      clearInterval(intervalId);
    };
  }, [isRunning, activeColors]);

  // Stop game after 3 winners
  useEffect(() => {
    if (winners.length === 3) {
      console.log("Game over: 3 winners reached", winners);
      setIsRunning(false);
      setActiveColors([]);
    }
  }, [winners]);

  // Handle color selection
  const handleColorChange = (color) => {
    if (!isRunning || winners.length >= 3) {
      console.log(
        "Color change blocked: game not running or 3 winners reached"
      );
      return;
    }

    console.log("Handling color change:", color.name);
    setCurrentColor(color);
    setColorCounts((prevCounts) => {
      const updatedCount = prevCounts[color.name] + 1;
      const updated = { ...prevCounts, [color.name]: updatedCount };

      if (
        updatedCount === 3 &&
        !winners.includes(color.name) &&
        winners.length < 3
      ) {
        console.log(`${color.name} reached count 3, adding to winners`);
        const newWinners = [...winners, color.name];
        setWinners(newWinners);
        setActiveColors(activeColors.filter((c) => c.name !== color.name));
        console.log("Updated winners:", newWinners);
        console.log(
          "Updated active colors:",
          activeColors.filter((c) => c.name !== color.name).map((c) => c.name)
        );
      }
      return updated;
    });
  };

  // Prize labels (1st, 2nd, 3rd)
  const getPrizeLabel = (index) => {
    const suffix = ["1st", "2nd", "3rd"];
    const label = suffix[index]
      ? `${suffix[index]} Prize`
      : `${index + 1}th Prize`;
    console.log(`Prize for index ${index}: ${label}`);
    return label;
  };

  // Start/reset game
  const handleStart = () => {
    console.log("Starting game");
    setActiveColors(colorList);
    setCurrentColor(colorList[0]);
    setColorCounts(Object.fromEntries(colorList.map((c) => [c.name, 0])));
    setWinners([]);
    setIsRunning(true);
  };

  return (
    <div
      className={`min-vh-100 min-vw-100 d-flex flex-column justify-content-center align-items-center ${
        !isRunning && winners.length === 0
          ? "bg-white text-dark"
          : `bg-${currentColor.code} text-white`
      } p-2 p-md-3`}
      style={{ transition: "background-color 0.5s" }}
    >
      <h1
        className="mb-3 fs-3 fs-md-2 fw-bold shadow p-2 rounded-1"
        style={{ fontFamily: "Poppins" }}
      >
        Color Change Game
      </h1>
      <h3
        className="mb-3 fs-5 fs-md-4 fw-bold"
        style={{ fontFamily: "Poppins" }}
      >
        Current Color : {" "}
        <span className="badge bg-light text-dark fst-italic shadow p-2 rounded-1">{currentColor.name}</span>
      </h3>

      <div className="my-2 d-flex flex-wrap gap-1 gap-md-3 justify-content-center shadow">
        <button
          className="btn btn-primary btn-sm btn-md-normal"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="btn btn-primary btn-sm btn-dark"
          onClick={() => {
            console.log("Stopping game");
            setIsRunning(false);
          }}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>

      <div className="mb-3 d-flex flex-wrap justify-content-center gap-1 gap-md-2 shadow">
        {activeColors.map((color) => (
          <button
            key={color.name}
            className={`btn btn-${color.code} btn-sm btn-md-normal`}
            onClick={() => handleColorChange(color)}
          >
            {color.name}
          </button>
        ))}
      </div>

      <div className="w-100 w-md-50 px-2">
        <h5
          className="mb-2 fs-4 fs-md-5 text-center shadow p-2 rounded-2"
          style={{ fontFamily: "Poppins" }}
        >
          Color Count Card
        </h5>
        {Object.keys(colorCounts).length === 0 ? (
          <p className="text-danger text-center">
            Error: No colors loaded. Please reload.
          </p>
        ) : (
          <ul className="list-group mb-3">
            {Object.entries(colorCounts).map(([colorName, count]) => {
              const prizeIndex = winners.indexOf(colorName);
              const prizeText =
                prizeIndex !== -1 ? getPrizeLabel(prizeIndex) : null;
              const colorObj = colorList.find((c) => c.name === colorName);
              const isWinner = count === 3;
              console.log(
                `Rendering ${colorName}: count=${count}, prize=${
                  prizeText || "none"
                }, bg=${isWinner ? `bg-${colorObj.code}` : "default"}, bold=${
                  isWinner ? "yes" : "no"
                }, center=${isWinner ? "yes" : "no"}`
              );

              return (
                <li
                  key={colorName}
                  className={`list-group-item d-flex align-items-center ${
                    isWinner
                      ? `justify-content-center bg-${colorObj.code} text-white`
                      : "justify-content-between"
                  }`}
                >
                  <div className="d-flex align-items-center gap-1 gap-md-2 p-1 shadow">
                    <span
                      className={`fs-6 fs-md-5 ${isWinner ? "fw-bold" : ""}`}
                    >
                      {colorName}
                    </span>
                    {prizeText && (
                      <small
                        className={`fs-6 fs-md-5 ${
                          isWinner ? "text-white" : "text-muted"
                        }`}
                      >
                        Congratulations You Got {prizeText}!
                      </small>
                    )}
                  </div>
                  <span className="badge rounded-pill bg-dark">{count}</span>
                </li>
              );
            })}
          </ul>
        )}

        {winners.length === 3 && (
          <h4 className="mt-3 text-success fw-bold text-center fs-5 fs-md-4 bg-dark p-2 shadow rounded-2">
            Game Over! 3 colors have won their prizes.
          </h4>
        )}
      </div>
    </div>
  );
}

export default App;
