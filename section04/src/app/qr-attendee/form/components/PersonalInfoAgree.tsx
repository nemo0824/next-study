import { Checkbox, Flex } from "@mantine/core";
import React from "react";

export const PersonalInfoAgree = () => {
  return (
    <div className="bg-[#F8F9FA] p-4 rounded-l mt-4">
      <h3 className="font-bold">개인정보 수집 및 이용 동의</h3>
      <p className="text-[#666666] mt-4">
        수집된 개인정보는 출석 확인 및 행사 운영 목적으로만 사용되며 행사 종료후
        즉시 파기됩니다
      </p>
      <Flex className="mt-4" gap={8} align={"center"}>
        <Checkbox />
        <span>개인정보 수집 및 이용에 동의합니다</span>
      </Flex>
    </div>
  );
};
