```mermaid
sequenceDiagram
  participant Client
  participant Server
  
  Client->>+Server:GET https://studies.cs.helsinki.fi/exampleapp/spa
  Server-->>-Client:spa
  Client->>+Server:GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  Server-->>-Client:spa.js
  Client->>+Server:GET https://studies.cs.helsinki.fi/exampleapp/main.css
  Server-->>-Client:main.css
  Client->>+Server:GET https://studies.cs.helsinki.fi/exampleapp/data.json
  Server-->>-Client:data.json
  Client->>+Server:GET https://studies.cs.helsinki.fi/favicon.ico
  Server-->>-Client:favicon.ico
```
