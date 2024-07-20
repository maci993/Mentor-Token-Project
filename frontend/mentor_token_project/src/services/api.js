import axios from "axios";

const API_BASE_URL = "/api";

export const fetchJobs = async (token) => {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data;
};

export const fetchJobApplications = async (token) => {
  const res = await fetch(`${API_BASE_URL}/jobapplications`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

export const fetchJobOffers = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching job offers:", error);
    throw error;
  }
};

export const updateJobOfferStatus = async (offerId, status, token) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${offerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};
