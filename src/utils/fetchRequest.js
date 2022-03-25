const ROOT_URL = "https://621535a9cdb9d09717b1e3a2.mockapi.io/todo-api/v1/tasks";
const REQUEST_HEADER = {
  "Content-type": "application/json",
};

export async function getData(id = null) {
  const URL = id ? `${ROOT_URL}/${id}` : ROOT_URL;
  const res = await fetch(URL);
  return await res.json();
}

export async function postData(body = null) {
  const res = await fetch(ROOT_URL, {
    method: "POST",
    headers: REQUEST_HEADER,
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function updateData(updatedTask) {
  const { id } = updatedTask;
  const res = await fetch(`${ROOT_URL}/${id}`, {
    method: "PUT",
    headers: REQUEST_HEADER,
    body: JSON.stringify(updatedTask),
  });
  return await res.json();
}

export async function deleteData(id) {
  return await fetch(`${ROOT_URL}/${id}`, {
    method: "DELETE",
  });
}
