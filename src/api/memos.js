export async function getMemos({
  status,
  keyword,
  sort = "id",
  order = "asc",
  page = 1,
  size = 5,
} = {}) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (keyword) params.set("keyword", keyword);
  params.set("sort", sort);
  params.set("order", order);
  params.set("page", String(page));
  params.set("size", String(size));

  const res = await fetch(`/api/memos?${params.toString()}`);
  await throwIfNotOk(res);
  return await res.json();
}

async function throwIfNotOk(res) {
  if (res.ok) return;

  let message = String(res.status);
  try {
    const data = await res.json();
    if (data?.message) message = data.message;
  } catch {
    // response body가 json이 아니면 status 코드만 사용
  }

  throw new Error(message);
}

export async function createMemo({ title, content, status }) {
  const res = await fetch("/api/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, status }),
  });
  await throwIfNotOk(res);
}

export async function updateMemo(id, { title, content, status }) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, status }),
  });
  await throwIfNotOk(res);
}

export async function deleteMemo(id) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "DELETE",
  });
  await throwIfNotOk(res);
}
