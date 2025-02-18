
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const foodId = resolvedParams.id;
  console.log(foodId);

  return <div></div>;
}
