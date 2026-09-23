import { loader } from "fumadocs-core/source";

import { docs } from "@/.source";

export const source: ReturnType<typeof loader> = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
