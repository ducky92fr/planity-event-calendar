import type { Meta, StoryObj } from "@storybook/react";
import { EventSlot as EventSlotComponent } from "./EventSlot";

const meta: Meta<typeof EventSlotComponent> = {
  title: "Component/EventSlot",
  component: EventSlotComponent,
  args: {
    id: 1,
    position: {
      top: 100,
      left: 50,
      height: 150,
      width: 200,
    },
  },
};

export default meta;

type Story = StoryObj<typeof EventSlotComponent>;

export const EventSlot: Story = {};
