# GraphQL

## Fetch Song list with keyword

```
query {
  readSongs(keyword: "hisa") {
    ID
    Title
    Artist
    Album
    Length
    StreamFile {
      url
    }
  }
}
```