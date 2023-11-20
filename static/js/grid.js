class ForwardGrid {
    #FORWARD_GRID = "forward-grid";
    #FORWARD_DATA_HEADER = "forward-data-header";
    #FORWARD_DATA_ROW = "forward-data-row";
    #FORWARD_SELECTED_DATA = "forward-selected-data";
    #FORWARD_TEXT_CENTER = "forward-text-center";

    createElement(options) {
        if(options == null) { throw Error("options must be not null"); }
        const __instance = this;

        this.parentElement = options.element;
        this.columns = options.columns;
        this.clickEvent = options.clickEvent;
        this.tableElement = document.createElement("table");
        this.tableElement.className = this.#FORWARD_GRID;

        this.headerElement = document.createElement("tr");
        this.headerElement.className = this.#FORWARD_DATA_HEADER;
        this.columns.forEach((iv, i) => {
           let thElement = document.createElement("th");
           thElement.innerText = iv.columnNm;
            __instance.tableElement.appendChild(thElement);
        });


        this.parentElement.innerHTML = "";
        this.tableElement.appendChild(this.headerElement);
        this.parentElement.appendChild(this.tableElement);
    }

    emptyRows() {
        this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}`).forEach((iv, i) => {
            iv.remove();
        });
    }

    removeRows(idx) {
        this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}`)[idx].remove();
    }

    resetData(data) {
        const __instance = this;
        this.emptyRows();

        this.data = data;
        data.forEach((iv, i) => {
            let trElement = document.createElement("tr");
            trElement.className = this.#FORWARD_DATA_ROW;
            __instance.columns.forEach((kv, k) => {
                let value = iv[kv.columnId] || "";
                let tdElement = document.createElement("td");
                tdElement.classList.add(this.#FORWARD_TEXT_CENTER);
                tdElement.innerText = value;

                trElement.appendChild(tdElement);
            });

            trElement.onclick = () => {
                this.unSelectRow();
                trElement.classList.add(this.#FORWARD_SELECTED_DATA);
                if(__instance.clickEvent != null) { __instance.clickEvent({rowNum: __instance.getSelectedRowNum(), data: __instance.getSelectedRowData()}); }
            };

            __instance.tableElement.appendChild(trElement);
        });
    }

    getData() {
        return this.data;
    }

    getSelectedRowNum() {
        let rowNum = null;
        this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}`).forEach((iv, i) => {
            if(iv.classList.contains(this.#FORWARD_SELECTED_DATA)) { rowNum = i; }
        });

        return rowNum;
    }

    getSelectedRowData() {
        let rowNum = this.getSelectedRowNum();
        if(rowNum == null) { return null; }

        return this.data[rowNum];
    }

    unSelectRow() {
        this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}.${this.#FORWARD_SELECTED_DATA}`).forEach((iv, i) => {
            iv.classList.remove(this.#FORWARD_SELECTED_DATA);
        });
    }

    selectRow(rowNum) {
        if(this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}`).length <= rowNum) { return; }

        this.unSelectRow();
        this.tableElement.querySelectorAll(`.${this.#FORWARD_DATA_ROW}`)[rowNum].classList.add(this.#FORWARD_SELECTED_DATA);
        if(this.clickEvent != null) { this.clickEvent({rowNum: rowNum, data: this.getSelectedRowData()}); }
    }

}