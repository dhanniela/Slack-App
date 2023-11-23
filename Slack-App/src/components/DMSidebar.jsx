import React, { useEffect } from "react";
import { Search} from "lucide-react";

export const DMSidebar = () => {

    return (
        <div className="searchBar">
            <Search />
            <input
                id="search-dm"
                type="text"
                name="search-dm"
                placeholder="Find a DM"
            />
            <button
                id="search-submit"
                type="submit"
                name="search-submit"
            >
            </button>
        </div>
    )
}
