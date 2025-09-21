import { Alert, Input } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { Clock } from "lucide-react";
import type { BusinessHour } from "shared/types/api/schemas";

type BusinessHourPops = {
  businessHours: BusinessHour[];
  isEditing: boolean;
  handleBusinessHoursChange: (
    index: number,
    field: keyof BusinessHour,
    value: BusinessHour[keyof BusinessHour]
  ) => void;
};

export function BusinessHours({
  businessHours,
  isEditing,
  handleBusinessHoursChange,
}: BusinessHourPops) {
  return (
    <Card
      component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 id="hours-heading" className="text-lg font-semibold">
              Business Hours
            </h2>
          </div>
          {isEditing && (
            <Alert status="warning" className="mb-2">
              Important: Set accurate business hours so customers know when you&apos;re open and can
              plan their visits!
            </Alert>
          )}
        </div>
      }
      aria-labelledby="hours-heading"
    >
      {isEditing && (
        <Alert status="information" className="mb-4">
          Set your opening and closing times for each day. Check &quot;Closed&quot; if you
          don&apos;t operate on that day.
        </Alert>
      )}
      <table className="w-full border-collapse" aria-label="Business hours">
        <thead>
          <tr className="border-b border-foreground text-primary">
            <th className="text-left py-3 px-4 font-medium ">Day</th>
            <th className="text-left py-3 px-4 font-medium ">Opening Time</th>
            <th className="text-left py-3 px-4 font-medium ">Closing Time</th>
            <th className="text-left py-3 px-4 font-medium ">Closed</th>
          </tr>
        </thead>
        <tbody>
          {businessHours.map((hours: BusinessHour, index: number) => (
            <tr key={hours.day} className="border-b border-primary/10">
              <td className="py-3 px-4 font-medium ">{hours.day}</td>

              <td className="py-3 px-4">
                <Input
                  outlineType={isEditing ? "round" : "none"}
                  type="time"
                  name={`${hours.day} opening time`}
                  label="Opening Time"
                  disabled={!isEditing || hours.isClosed}
                  value={hours.open}
                  onChange={(e) => handleBusinessHoursChange(index, "open", e.target.value)}
                />
              </td>

              <td className="py-3 px-4">
                <Input
                  outlineType={isEditing ? "round" : "none"}
                  type="time"
                  name={`${hours.day} closing time`}
                  label="Closing Time"
                  disabled={!isEditing || hours.isClosed}
                  value={hours.close}
                  onChange={(e) => handleBusinessHoursChange(index, "close", e.target.value)}
                />
              </td>

              <td className="py-3 px-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hours.isClosed}
                    onChange={(e) => handleBusinessHoursChange(index, "isClosed", e.target.checked)}
                    disabled={!isEditing}
                    className="mr-2"
                    aria-label={`${hours.day} closed`}
                    id={`closed-${hours.day}`}
                  />
                  <label htmlFor={`closed-${hours.day}`} className="text-sm">
                    Closed
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
