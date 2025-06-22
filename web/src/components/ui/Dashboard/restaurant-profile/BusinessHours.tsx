import { Input } from "@/components/atoms";

export function BusinessHours({
  businessHours,
  isEditing,
  handleBusinessHoursChange,
}: any) {
  return (
    <section
      className="bg-white rounded-lg border-1 border-gray-100 p-6"
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
            <span className="font-medium text-black" role="rowheader">
              {hours.day}
            </span>

            <Input
              outlineType={isEditing && "round"}
              type="time"
              name={`${hours.day} opening time`}
              label={`${hours.day} opening time`}
              disabled={!isEditing || hours.closed}
              value={hours.open}
              onChange={(e) =>
                handleBusinessHoursChange(index, "open", e.target.value)
              }
            />

            <Input
              outlineType={isEditing && "round"}
              type="time"
              name={`${hours.day} closing time`}
              label={`${hours.day} closing time`}
              disabled={!isEditing || hours.closed}
              value={hours.close}
              onChange={(e) =>
                handleBusinessHoursChange(index, "close", e.target.value)
              }
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
              <label
                htmlFor={`closed-${hours.day}`}
                className="text-sm text-black"
              >
                Closed
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
