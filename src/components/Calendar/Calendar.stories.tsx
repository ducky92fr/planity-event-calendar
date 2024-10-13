import type { Meta, StoryObj } from "@storybook/react";

import { Calendar as CalendarComponent } from "./Calendar";

const meta: Meta<typeof CalendarComponent> = {
  title: "Component/Calendar",
  component: CalendarComponent,
  args: {
    workingHours: {
      openingTime: {
        hour: 9,
        minute: 0,
      },
      closingTime: {
        hour: 21,
        minute: 0,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CalendarComponent>;

export const Calendar: Story = {};
