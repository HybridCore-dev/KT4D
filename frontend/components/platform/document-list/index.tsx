"use client";

import { EyeIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import Pagination from "../pagination";
import SearchInput from "../search-input";
import SelectBox from "../select-box";
import data from "./mock-data";

export default function DocumentList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageRowCount] = useState(5);
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [year, setYear] = useState("");

  const filteredData = useMemo(() => {
    let newData = [...data];

    if (search)
      newData = newData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );

    if (author)
      newData = newData.filter((item) =>
        item.author.toLowerCase().includes(author.toLowerCase()),
      );

    if (documentType)
      newData = newData.filter((item) =>
        item.documentType.toLowerCase().includes(documentType.toLowerCase()),
      );

    if (year)
      newData = newData.filter((item) =>
        item.year.toLowerCase().includes(year.toLowerCase()),
      );

    return newData;
  }, [search, author, documentType, year]);

  const authors = useMemo(() => {
    const authors: string[] = [];
    data.forEach((item) => {
      authors.push(...item.author.split(",").map((author) => author.trim()));
    });
    return _.uniq(authors).sort();
  }, []);

  const years = useMemo(() => {
    return _.uniq(data.map((item) => item.year.trim())).sort();
  }, []);

  const totalPageCount = Math.ceil(filteredData.length / pageRowCount);

  useEffect(() => {
    setCurrentPage(0);
  }, [search, author, documentType, year]);

  return (
    <div className="container mx-auto rounded-2xl p-8">
      <div className="grid grid-cols-4 gap-2 mb-4">
        <SearchInput value={search} onChange={setSearch} />
        <SelectBox
          options={authors.map((item) => ({
            value: item,
            text: item,
          }))}
          value={author}
          placeholder="Author"
          onChange={(value) => setAuthor(String(value))}
        />
        <SelectBox
          options={[
            { value: "Academic Papers", text: "Academic Papers" },
            { value: "Newspaper Articles", text: "Newspaper Articles" },
            { value: "Policy Papers", text: "Policy Papers" },
          ]}
          value={documentType}
          placeholder="Document Type"
          onChange={(value) => setDocumentType(String(value))}
        />
        <SelectBox
          options={years.map((item) => ({
            value: item,
            text: item,
          }))}
          value={year}
          placeholder="Year"
          onChange={(value) => setYear(String(value))}
        />
      </div>

      <table className="w-full border-t border-t-secondary-light/20 text-sm">
        <thead>
          <tr className="border-b border-b-secondary-light/20">
            <th className="text-center px-4 py-4">Title</th>
            <th className="text-center px-4 py-4 w-80">Publisher / Author</th>
            <th className="text-center px-4 py-4 w-64">Document Type</th>
            <th className="text-center px-4 py-4 w-20">Year</th>
            <th className="text-center px-4 py-4 w-20"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(currentPage * pageRowCount, (currentPage + 1) * pageRowCount)
            .map((item) => (
              <tr
                key={item.id}
                className="border-b border-b-secondary-light/20"
              >
                <td className="px-4 py-2">
                  {search ? (
                    <Highlighter
                      highlightClassName="bg-yellow"
                      searchWords={[search]}
                      autoEscape
                      textToHighlight={item.title}
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td className="px-4 py-2">{item.author}</td>
                <td className="px-4 py-2">{item.documentType}</td>
                <td className="px-4 py-2">{item.year}</td>
                <td className="px-4 py-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="nofollow"
                    className="p-2 text-white"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center pt-4">
        <Pagination
          count={totalPageCount}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
