import { useState } from "react";
import ProductDescription from "./ProductDescription";

const tabs = [
    {
        id: "description",
        label: "Description",
    },
    {
        id: "additional-information",
        label: "Additional Information",
    },
    {
        id: "reviews",
        label: "Reviews",
    },
];

function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState("description");

    const renderTabContent = () => {
        switch (activeTab) {
            case "additional-information":
                return (
                    <div className="flex min-h-[250px] items-center justify-center px-6 py-16 text-center">
                        <p className="max-w-[600px] text-base leading-7 tracking-[0.2px] text-[#737373]">
                            {product.detailContent.additionalInformation}
                        </p>
                    </div>
                );

            case "reviews":
                return (
                    <div className="flex min-h-[250px] items-center justify-center px-6 py-16 text-center">
                        <p className="text-base leading-7 tracking-[0.2px] text-[#737373]">
                            No reviews have been submitted yet.
                        </p>
                    </div>
                );

            case "description":
            default:
                return (
                    <ProductDescription
                        content={product.detailContent}
                    />
                );
        }
    };

    return (
        <section className="flex w-full flex-col bg-white">
            <div className="border-b border-[#ECECEC]">
                <div className="mx-auto flex w-full max-w-[1050px] overflow-x-auto px-6">
                    <div className="flex min-w-max items-center gap-[30px] lg:mx-auto lg:gap-[62px]">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex h-[90px] items-center border-b-2 text-sm font-bold leading-6 tracking-[0.2px] ${isActive
                                            ? "border-[#737373] text-[#737373]"
                                            : "border-transparent text-[#737373]"
                                        }`}
                                >
                                    {tab.label}

                                    {tab.id === "reviews" && (
                                        <span className="ml-1 text-[#23856D]">
                                            ({product.reviewCount ?? 0})
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1050px] px-8 py-16 lg:px-0">
                {renderTabContent()}
            </div>
        </section>
    );
}

export default ProductTabs;
