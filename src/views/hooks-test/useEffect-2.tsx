import { useEffect, useState } from "react";

const request = (): Promise<Record<string, any>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "请求成功",
        data: [1, 2, 3, 4, 5],
        code: 200,
      });
    }, 2000);
  });
};

function ComponentUseEffect() {
  const [list, setList] = useState<number[]>([]);

  // 在渲染之后执行回调函数
  useEffect(() => {
    const queryList = async () => {
      const { data }: Record<string, number[]> = await request();

      setList(data);
    };

    queryList();
  });

  console.log("执行组件");

  return (
    <>
      <div>
        <h2>useEffect 使用 2</h2>

        {list.map((item: number) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
}

export default ComponentUseEffect;
