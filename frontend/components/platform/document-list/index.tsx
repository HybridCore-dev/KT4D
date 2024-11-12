"use client";

import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/platform/button";
import IconList from "@/assets/icon-list.svg";
import IconButton from "@/components/platform/icon-button";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useDictionary from "@/hooks/useDictionary";
import SearchInput from "../search-input";
import SelectBox from "../select-box";
import data from "./mock-data";
import Pagination from "../pagination";
import Highlighter from "react-highlight-words";
import _ from "lodash";

export default function DocumentList() {
  const { dictionary } = useDictionary();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageRowCount] = useState(10);
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [year, setYear] = useState("");

  const filteredData = useMemo(() => {
    let newData = [...data];

    if (search.length > 0)
      newData = newData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );

    if (author.length > 0)
      newData = newData.filter((item) =>
        item.author.toLowerCase().includes(author.toLowerCase())
      );

    if (documentType.length > 0)
      newData = newData.filter((item) =>
        item.documentType.toLowerCase().includes(documentType.toLowerCase())
      );

    if (year.length > 0)
      newData = newData.filter((item) =>
        item.year.toLowerCase().includes(year.toLowerCase())
      );

    return newData;
  }, [search, author, documentType, year]);

  const authors = useMemo(() => {
    const authors: string[] = [];
    data.forEach((item) => {
      const _authors = item.author.split(",");
      authors.push(..._authors.map((author) => author.trim()));
    });
    return _.uniq(authors).sort();
  }, []);

  const years = useMemo(() => {
    const years: string[] = [];
    data.forEach((item) => {
      years.push(item.year.trim());
    });
    return _.uniq(years).sort();
  }, []);

  const totalPageCount = useMemo(() => {
    return Math.ceil(filteredData.length / pageRowCount);
  }, [pageRowCount, filteredData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onAuthorChange = (value: string) => {
    setAuthor(value);
  };

  const onDocumentTypeChange = (value: string) => {
    setDocumentType(value);
  };

  const onYearChange = (value: string) => {
    setYear(value);
  };

  return (
    <div>
      <Button
        variant="text"
        color="white"
        className="flex-col"
        onClick={openModal}
      >
        <Image src={IconList} width={36} height={36} alt="" className="mb-2" />
        {dictionary.documentList.title}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="container transform overflow-hidden rounded-2xl bg-[#1B2B42] pt-8 pb-4 md:pb-6 px-0 text-center shadow-xl transition-all">
                  <IconButton
                    className="absolute top-6 right-6"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                  <Dialog.Title
                    as="h5"
                    className="font-semibold max-w-2xl text-left pl-8"
                  >
                    {dictionary.documentList.title}
                  </Dialog.Title>

                  <div className="grid grid-cols-4 gap-2 p-8 pb-4">
                    <SearchInput value={search} onChange={onSearchChange} />
                    <SelectBox
                      options={authors.map((item) => ({
                        value: item,
                        text: item,
                      }))}
                      value={author}
                      placeholder="Author"
                      onChange={onAuthorChange}
                    />
                    <SelectBox
                      options={[
                        {
                          value: "Academic Papers",
                          text: "Academic Papers",
                        },
                        {
                          value: "Newspaper Articles",
                          text: "Newspaper Articles",
                        },
                        {
                          value: "Policy Papers",
                          text: "Policy Papers",
                        },
                      ]}
                      value={documentType}
                      placeholder="Document Type"
                      onChange={onDocumentTypeChange}
                    />
                    <SelectBox
                      options={years.map((item) => ({
                        value: item,
                        text: item,
                      }))}
                      value={year}
                      placeholder="Year"
                      onChange={onYearChange}
                    />
                  </div>

                  <table className="w-full border-t border-t-secondary-light/20 text-sm">
                    <thead>
                      <tr className="border-b border-b-secondary-light/20">
                        <th className="text-left px-4 pl-8 py-4">Title</th>
                        <th className="text-left px-4 py-4 w-80">
                          Publisher/Author
                        </th>
                        <th className="text-left px-4 py-4 w-64">
                          Document Type
                        </th>
                        <th className="px-4 py-4 w-20">Year</th>
                        <th className="px-4 py-4 w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData
                        .slice(
                          currentPage * pageRowCount,
                          (currentPage + 1) * pageRowCount
                        )
                        .map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-b-secondary-light/20"
                          >
                            <td className="text-left px-4 py-2 pl-8">
                              {search.length > 0 ? (
                                <Highlighter
                                  highlightClassName="bg-yellow"
                                  searchWords={[search]}
                                  autoEscape={true}
                                  textToHighlight={item.title}
                                />
                              ) : (
                                item.title
                              )}
                            </td>
                            <td className="text-left px-4 py-2">
                              {item.author}
                            </td>
                            <td className="text-left px-4 py-2">
                              {item.documentType}
                            </td>
                            <td className=" px-4 py-2">{item.year}</td>
                            <td className=" px-4 py-2">
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

                  <div className="flex justify-center pt-4">
                    <Pagination
                      count={totalPageCount}
                      page={currentPage}
                      onChange={onPageChange}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
