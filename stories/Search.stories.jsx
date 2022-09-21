import SearchResult from "../components/SearchResult";

export default {
    title: "Components/SearchResultDisplay",
    component: SearchResultDisplay,
};

export const SearchResultDisplay = () =>{
    const props = {
        tags: ["FT", "Interface"],
        name: "FungibleToken"
    }
    return <SearchResult {...props}/>
}

