import React from "react";
import { Flex } from "@mantine/core";
import { Button } from "@/components/Button";
import { LectureQrForm } from "../QrContainer";

interface QrFormTime {
  title: string;
  times: number[];
  description: string;
  timeUnit: string;
  selectTime: number;
  onChange: (
    lecture: Partial<
      Pick<
        LectureQrForm,
        "qrRefreshInterval" | "formSubmitLimit" | "validRadius"
      >
    >
  ) => void;
  fieldName: "qrRefreshInterval" | "formSubmitLimit" | "validRadius";
}

export const QrFormTime = ({
  title,
  times,
  description,
  timeUnit,
  selectTime,
  onChange,
  fieldName,
}: QrFormTime) => {
  const onClick = (i: number) => onChange({ [fieldName]: times[i] });

  return (
    <>
      <div className="bg-[#F1F1F1] w-1/2 p-8 rounded-lg">
        <h2 className="font-bold text-2xl">{title}</h2>
        <Flex gap="sm" mt="xl">
          {times.map((time, i) => {
            return (
              <Button
                key={i}
                onClick={() => onClick(i)}
                size={times.indexOf(selectTime) === i ? "md" : "sm"}
                radius="xl"
                styles={{
                  root: {
                    backgroundColor:
                      times.indexOf(selectTime) === i ? "#1251D4" : "#F1F1F1",
                    color: times.indexOf(selectTime) === i ? "white" : "black",
                  },
                }}
              >
                {time}
                {timeUnit}
              </Button>
            );
          })}
        </Flex>
        <Flex justify={"space-between"} gap="sm" mt="xl">
          <span>{description}</span>
          <div>
            <span className="text-[#1251D4] font-bold text-xl">
              {selectTime}
            </span>
            <span>{timeUnit}</span>
          </div>
        </Flex>
      </div>
    </>
  );
};
