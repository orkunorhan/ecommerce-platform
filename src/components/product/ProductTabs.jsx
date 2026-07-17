import { useState } from "react";

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

    const stock = Number(product.stock) || 0;
    const rating = Number(product.rating) || 0;
    const sellCount = Number(product.sell_count) || 0;

    const renderTabContent = () => {
        switch (activeTab) {
            case "additional-information":
                return (
                    <div className="w-full py-4">
                        <dl className="mx-auto w-full max-w-[650px] divide-y divide-[#ECECEC]">
                            <div className="flex items-center justify-between gap-6 py-4">
                                <dt className="text-sm font-bold text-[#252B42]">
                                    Product ID
                                </dt>

                                <dd className="text-sm text-[#737373]">
                                    {product.id}
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-6 py-4">
                                <dt className="text-sm font-bold text-[#252B42]">
                                    Stock
                                </dt>

                                <dd className="text-sm text-[#737373]">
                                    {stock}
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-6 py-4">
                                <dt className="text-sm font-bold text-[#252B42]">
                                    Rating
                                </dt>

                                <dd className="text-sm text-[#737373]">
                                    {rating.toFixed(1)} / 5
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-6 py-4">
                                <dt className="text-sm font-bold text-[#252B42]">
                                    Sold
                                </dt>

                                <dd className="text-sm text-[#737373]">
                                    {sellCount}
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-6 py-4">
                                <dt className="text-sm font-bold text-[#252B42]">
                                    Category ID
                                </dt>

                                <dd className="text-sm text-[#737373]">
                                    {product.category_id}
                                </dd>
                            </div>
                        </dl>
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
                    <div className="w-full">
                        <div className="mx-auto max-w-[800px]">
                            <h2 className="text-2xl font-bold leading-8 tracking-[0.1px] text-[#252B42]">
                                Product Description
                            </h2>

                            <p className="mt-6 whitespace-pre-line text-base leading-7 tracking-[0.2px] text-[#737373]">
                                {product.description ||
                                    "No description is available for this product."}
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <section className="flex w-full flex-col bg-white">
            <div className="border-b border-[#ECECEC]">
                <div className="mx-auto flex w-full max-w-[1050px] overflow-x-auto px-6">
                    <div className="flex min-w-max items-center gap-[30px] lg:mx-auto lg:gap-[62px]">
                        {tabs.map((tab) => {
                            const isActive =
                                activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(tab.id)
                                    }
                                    className={`flex h-[90px] items-center border-b-2 text-sm font-bold leading-6 tracking-[0.2px] transition-colors ${isActive
                                        ? "border-[#737373] text-[#252B42]"
                                        : "border-transparent text-[#737373] hover:text-[#252B42]"
                                        }`}
                                >
                                    {tab.label}

                                    {tab.id === "reviews" && (
                                        <span className="ml-1 text-[#23856D]">
                                            (0)
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
