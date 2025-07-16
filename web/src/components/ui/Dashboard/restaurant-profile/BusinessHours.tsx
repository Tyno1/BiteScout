import { Input } from "@/components/atoms";
import { Card } from "@/components/organisms";
import type{ BusinessHour } from "@shared/types/api/schemas";
import { Clock, Info, Sparkles } from "lucide-react";

type BusinessHourPops = {
  businessHours: BusinessHour[];
  isEditing: boolean;
  handleBusinessHoursChange: (index: number, field: keyof BusinessHour, value: BusinessHour[keyof BusinessHour]) => void;
};

export function BusinessHours({
  businessHours,
  isEditing,
  handleBusinessHoursChange,
}: BusinessHourPops) {
  return (
    <Card
      Component="section"
      padding="lg"
      header={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 id="hours-heading" className="text-lg font-semibold">
              Business Hours
            </h2>
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Important:</strong> Set accurate business hours so customers know when you're open and can plan their visits!
              </span>
            </div>
          )}
        </div>
      }
      aria-labelledby="hours-heading"
    >
      {isEditing && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg mb-4">
          <Info className="w-4 h-4" />
          <span>Set your opening and closing times for each day. Check "Closed" if you don't operate on that day.</span>
        </div>
      )}
      <table className="w-full border-collapse" aria-label="Business hours">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Day</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Opening Time</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Closing Time</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Closed</th>
          </tr>
        </thead>
        <tbody>
          {businessHours.map((hours: BusinessHour, index: number) => (
            <tr
              key={hours.day}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 font-medium text-gray-900">
                {hours.day}
              </td>

              <td className="py-3 px-4">
                <Input
                  outlineType={isEditing ? "round" : "none"}
                  type="time"
                  name={`${hours.day} opening time`}
                  label=""
                  disabled={!isEditing || hours.closed}
                  value={hours.open}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "open", e.target.value)
                  }
                />
              </td>

              <td className="py-3 px-4">
                <Input
                  outlineType={isEditing ? "round" : "none"}
                  type="time"
                  name={`${hours.day} closing time`}
                  label=""
                  disabled={!isEditing || hours.closed}
                  value={hours.close}
                  onChange={(e) =>
                    handleBusinessHoursChange(index, "close", e.target.value)
                  }
                />
              </td>

              <td className="py-3 px-4">
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
                    className="text-sm text-gray-700"
                  >
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
