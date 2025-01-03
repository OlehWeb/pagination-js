export const paginate = (
    productList,
    renderList = () => {},
    paginationSelector = ".pagination",
    defaultProductPageCount = 9,
    defaultCurrentPage = 1
) => {
    let productCount = defaultProductPageCount;
    let currentPage = defaultCurrentPage;

    const pagination = document.querySelector(paginationSelector);
    const pageCount = Math.ceil(productList.length / productCount);

    const renderPrevBtn = () => {
        const li = document.createElement("li");

        li.className = "pagination__prev";
        li.innerHTML = `<button class="btn btn--prev">Prev</button>`;

        pagination.append(li);
    };

    const renderNextBtn = () => {
        const li = document.createElement("li");

        li.className = "pagination__next";
        li.innerHTML = `<button class="btn btn--next">Next</button>`;

        pagination.append(li);
    };

    const renderNumberBtn = (number) => {
        const li = document.createElement("li");

        li.innerHTML = `<button class="btn btn--number${
            number === currentPage ? " is-active" : ""
        }">${number}</button>`;

        pagination.append(li);
    };

    const renderDotsBtn = () => {
        const li = document.createElement("li");

        li.innerHTML = `<button class="btn btn--dots">...</button>`;

        pagination.append(li);
    };

    const renderPagination = () => {
        pagination.innerHTML = "";

        if (pageCount === 0 && !pagination.classList.contains("is-hidden")) {
            pagination.classList.add("is-hidden");
        } else if (pageCount === 1) {
            renderNumberBtn(1);
            pagination.classList.remove("is-hidden");
        } else if (pageCount < 6) {
            renderPrevBtn();

            for (let i = 1; i <= pageCount; i++) {
                renderNumberBtn(i);
            }

            if (pageCount !== currentPage) {
                renderNextBtn();
            }

            pagination.classList.remove("is-hidden");
        } else {
            if (currentPage !== 1) {
                renderPrevBtn();
            }

            if (currentPage < 5) {
                for (let i = 1; i <= 5; i++) {
                    renderNumberBtn(i);
                }
                renderDotsBtn();
                renderNumberBtn(pageCount);
            } else if (currentPage > pageCount - 4) {
                renderNumberBtn(1);
                renderDotsBtn();
                for (let i = pageCount - 4; i <= pageCount; i++) {
                    renderNumberBtn(i);
                }
            } else {
                renderNumberBtn(1);
                renderDotsBtn();
                renderNumberBtn(currentPage - 1);
                renderNumberBtn(currentPage);
                renderNumberBtn(currentPage + 1);
                renderDotsBtn();
                renderNumberBtn(pageCount);
            }

            if (currentPage !== pageCount) {
                renderNextBtn();
            }

            pagination.classList.remove("is-hidden");
        }
    };

    renderPagination(productList, productCount);

    pagination.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn--prev") && currentPage !== 1) {
            currentPage = currentPage - 1;
            renderList(
                currentPage * defaultProductPageCount - defaultProductPageCount,
                currentPage * defaultProductPageCount
            );
            renderPagination();
        } else if (e.target.classList.contains("btn--next") && currentPage !== pageCount) {
            currentPage = currentPage + 1;
            renderList(
                currentPage * defaultProductPageCount - defaultProductPageCount,
                currentPage * defaultProductPageCount
            );
            renderPagination();
        } else if (e.target.classList.contains("btn--number") && currentPage !== +e.target.textContent) {
            currentPage = +e.target.textContent;
            renderList(
                currentPage * defaultProductPageCount - defaultProductPageCount,
                currentPage * defaultProductPageCount
            );
            renderPagination();
        }
    });
};
