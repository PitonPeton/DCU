import React, { useState, useEffect } from "https://esm.sh/react@18?dev";

function ClockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );
}



function Callout({ heading, subheading, linkText, url, variant = 1 }) {
    const variants = [
        {
            class:
                "lg:col-span-2 lg:grid-cols-2 bg-gradient-to-br from-green-300 to-yellow-100",
            image:
                "https://cdn3d.iconscout.com/3d/premium/thumb/abstract-shape-8079078-6656490.png?f=webp"
        },
        {
            class: "bg-gradient-to-br from-orange-300 to-yellow-100",
            image:
                "https://cdn3d.iconscout.com/3d/premium/thumb/abstract-shape-8079089-6656501.png?f=webp"
        },
        {
            class: "bg-gradient-to-br from-red-300 to-yellow-100",
            image:
                "https://cdn3d.iconscout.com/3d/premium/thumb/abstract-shape-8085298-6656614.png?f=webp"
        }
    ];
    return (
        <div className={`grid ${variants[variant - 1].class}`}>
            <div className="flex flex-col gap-2 p-6">
                <h3 className="text-xl text-stone-800">{heading}</h3>
                <p className="text-stone-800 font-light">{subheading}</p>
                {url && (
                    <a
                        className="self-start mt-6 lg:mt-auto px-4 py-2 border border-stone-800 text-xs font-bold tracking-wide text-stone-800 uppercase hover:text-stone-900 hover:border-stone-900"
                        href={url}
                    >
                        {linkText}
                    </a>
                )}
            </div>
            <img
                className={`ml-auto mt-auto object-left-top object-none max-w-64 max-h-64`}
                src={variants[variant - 1].image}
                width="300"
                height="300"
            />
        </div>
    );
}


const HomePage = () => {
    return (
        <section className="pr-2 lg:pr-5 dark:bg-transparent bg-white grid gap-12 content-start">
            <header className="grid gap-8">
                <h2 className="text-stone-800 dark:text-white text-2xl font-medium">
                    Sustainable development goals and health innovation
                </h2>
                <div className="grid gap-6">
                    <Callout
                        heading="Weekly Report"
                        subheading="Track your performance"
                        linkText="View report"
                        url="#report"
                        variant={1}
                    />
                    <Callout
                        heading="Study 78X"
                        subheading={
                            <span className="flex items-center gap-2">
                                <ClockIcon /> In progress
                            </span>
                        }
                        variant={2}
                    />
                    <Callout
                        heading="Analyses"
                        subheading={
                            <span className="flex items-center gap-2">
                                <CheckIcon /> Completed
                            </span>
                        }
                        variant={3}
                    />
                </div>
            </header>
        </section>
    )
}

export default HomePage;