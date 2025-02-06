import React from "react";

export default function BusinessHours({
    businessHours,
    isEditing,
    handleBusinessHoursChange,
  }:any) {
  return (
    <section
      className="bg-white rounded-lg shadow-sm border p-6"
      aria-labelledby="hours-heading"
    >
      <div className="mb-4">
        <h2 id="hours-heading" className="text-lg font-semibold">
          Business Hours
        </h2>
      </div>
      <div className="space-y-4" role="table" aria-label="Business hours">
        {businessHours.map((hours: any, index: number) => (
          <div
            key={hours.day}
            className="grid grid-cols-4 gap-4 items-center"
            role="row"
          >
            <span className="font-medium" role="rowheader">
              {hours.day}
            </span>
            <input
              type="time"
              value={hours.open}
              onChange={(e) =>
                handleBusinessHoursChange(index, "open", e.target.value)
              }
              disabled={!isEditing || hours.closed}
              className="rounded-md border px-3 py-2 disabled:bg-gray-100"
              aria-label={`${hours.day} opening time`}
            />
            <input
              type="time"
              value={hours.close}
              onChange={(e) =>
                handleBusinessHoursChange(index, "close", e.target.value)
              }
              disabled={!isEditing || hours.closed}
              className="rounded-md border px-3 py-2 disabled:bg-gray-100"
              aria-label={`${hours.day} closing time`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={hours.closed}
                onChange={(e) =>
                  handleBusinessHoursChange(index, "closed", e.target.checked)
                }
                disabled={!isEditing}
                className="mr-2"
                aria-label={`${hours.day} closed`}
                id={`closed-${hours.day}`}
              />
              <label htmlFor={`closed-${hours.day}`} className="text-sm">
                Closed
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
