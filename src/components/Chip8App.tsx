import { useCallback } from "react";
import { Chip8Canvas } from "@/components/Chip8Canvas";
import { useChip8 } from "@/hooks/useChip8";
import "./Chip8App.css";

export function Chip8App() {
  const { chip8, frame, romName, error, loadDemoRom, loadRom, reset, handleKey } =
    useChip8();

  const onRomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void loadRom(file);
      e.target.value = "";
    },
    [loadRom],
  );

  return (
    <div className="chip8-app">
      <Chip8Canvas display={chip8.display} frame={frame} scale={8} />

      <div className="chip8-controls">
        <button type="button" className="chip8-primary" onClick={loadDemoRom}>
          Start .ch8 ROM
        </button>
        <label className="chip8-upload">
          <span>Upload</span>
          <input type="file" accept=".ch8,.CH8" onChange={onRomChange} />
        </label>
        <button type="button" onClick={reset} disabled={!romName}>
          Reset
        </button>
      </div>

      {romName && (
        <p className="chip8-status">
          Running: <strong>{romName}</strong>
        </p>
      )}
      {error && <p className="chip8-error">{error}</p>}

      <section
        className="chip8-keypad"
        tabIndex={0}
        onKeyDown={(e) => {
          handleKey(e.key, true);
          e.preventDefault();
        }}
        onKeyUp={(e) => handleKey(e.key, false)}
      >
        <div className="chip8-keys">
          {[
            ["1", "2", "3", "4"],
            ["Q", "W", "E", "R"],
            ["A", "S", "D", "F"],
            ["Z", "X", "C", "V"],
          ].map((row) => (
            <div key={row.join("")} className="chip8-key-row">
              {row.map((label) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={() => handleKey(label, true)}
                  onMouseUp={() => handleKey(label, false)}
                  onMouseLeave={() => handleKey(label, false)}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
