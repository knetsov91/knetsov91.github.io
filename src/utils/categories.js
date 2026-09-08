export const CATEGORY_TAGS = {
    Observability: ["Sentry", "OpenTelemetry", "Jaeger", "Prometheus", "Grafana", "Kibana", "Elasticsearch"],
    Testing: ["JUnit", "Pytest", "Jest"],
    Security: ["JWT", "HashiCorp Vault", "Spring Security"],
    DevOps: ["Docker", "Kubernetes", "Terraform", "CDK", "IaC", "GitHub Actions", "AWS", "Azure"],
    Messaging: ["Kafka", "WebSocket", "STOMP"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Milvus"],
};

export const matchesCategories = (project, categories) =>
    categories.length === 0 ||
    categories.some(c => CATEGORY_TAGS[c].some(tag => project.tags.includes(tag)));
