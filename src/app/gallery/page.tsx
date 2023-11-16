"use client";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash-es";
import Image from "next/image";

const Drive = () => {
  const [files, setFiles] = useState([]);
  const [imageSelected, setImageSelected] = useState<any>(null);

  const fetchFiles = async (tokens: string) => {
    const res = await fetch(
      `https://fujiframedmemories.vercel.app/api/gallery/list?tokens=${tokens}&limit=100&offset=0`
    );
    const files = await res.json();
    return files.files;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokens = url.searchParams.get("tokens");
    if (tokens) {
      localStorage.setItem("tokens", tokens);
      window.location.replace("https://fujiframedmemories.vercel.app/gallery");
    }
  }, []);

  useEffect(() => {
    const ggTokens = localStorage.getItem("tokens");
    if (ggTokens) {
      fetchFiles(ggTokens).then((files) => {
        setFiles(files);
      });
    }
  }, []);

  if (!files) return <div>Loading...</div>;

  const getImageAspectRatio = (file: any) => {
    const { imageMediaMetadata, owners } = file;
    const { width, height, rotation } = imageMediaMetadata;

    return {
      width: rotation ? height / 10 : width / 10,
      height: rotation ? width / 10 : height / 10,
    };
  };

  const getPhotoInfo = (file: any) => {
    const { imageMediaMetadata, owners } = file;
    const { cameraMake, cameraModel, focalLength, aperture, isoSpeed } =
      imageMediaMetadata;

    return {
      cameraMake,
      cameraModel,
      focalLength,
      aperture,
      isoSpeed,
      owner: owners[0].displayName,
    };
  };

  const loaderProp = ({ src }: any) => {
    return src;
  };

  return (
    <div className="xl:columns-4 md:columns-3 sm:columns-2 m-0 xl:pt-10 xl:px-32 md:pt-6 md:px-24 sm:pt-2 sm:px-8 bg-white">
      {files.map((file: any) => (
        <div
          key={file.id}
          className="relative"
          onClick={() => setImageSelected(file)}
        >
          <div className="absolute top-0  w-full h-full box-border cursor-pointer">
            <div className="absolute top-4 left-4 shadow-sm w-full box-border hidden">
              <h3>
                {getPhotoInfo(file).cameraMake} {getPhotoInfo(file).cameraModel}
              </h3>
            </div>
            <div className="absolute bottom-4 left-4 w-full box-border">
              <h3>F/{getPhotoInfo(file).aperture}</h3>
              <h3>{getPhotoInfo(file).focalLength}mm</h3>
              <h3>ISO {getPhotoInfo(file).isoSpeed}</h3>
            </div>
          </div>
          <Image
            src={file.imgLink}
            alt={`${file.imageMediaMetadata.width}x${file.imageMediaMetadata.height}`}
            width={getImageAspectRatio(file).width}
            height={getImageAspectRatio(file).height}
            className="rounded-3xl w-full px-1 py-2 cursor-pointer"
            quality={20}
            loader={loaderProp}
          />
        </div>
      ))}
      {imageSelected && (
        <div
          data-te-modal-init
          className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="staticBackdrop"
          data-te-backdrop="static"
          data-te-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
          >
            <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Image
                  src={imageSelected?.imgLink}
                  alt={`${imageSelected.imageMediaMetadata.width}x${imageSelected.imageMediaMetadata.height}`}
                  className="rounded-3xl w-full px-1 py-2 cursor-pointer"
                  quality={20}
                  loader={loaderProp}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drive;
