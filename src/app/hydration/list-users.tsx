"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  const res = await fetch("http://localhost:1337/api/schools?populate=*");
  const users = (await res.json()) as any[];
  return users;
}

export default function ListUsers() {
  const { data } = useQuery({
    queryKey: ["hydrate-users"],
    queryFn: () => getUsers(),
  });
  const posts = (data as any)?.data;
  console.log(posts);
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      {posts?.map((post: any) => {
        const { id, attributes } = post || {};
        const { name, phone, email, images } = attributes || {};
        const { data } = images || {};
        const Imgs = data?.map((item: any) => item.attributes.url);
        console.log(Imgs[0]);
        return (
          <div
            key={post.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            {Imgs?.map((img: any, index: any) => (
              <img
                key={index}
                style={{ width: 200 }}
                src={`http://localhost:1337${Imgs[index]}`}
                alt={"Picture of the author!"}
              />
            ))}

            <p>Tên trường:&nbsp;{name}</p>
            <p>Số điện thoại:&nbsp;{phone}</p>
            <p>Địa chỉ email:&nbsp;{email}</p>
          </div>
        );
      })}
    </main>
  );
}
