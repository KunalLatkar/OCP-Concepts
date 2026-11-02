// OpenShift Learning Hub - Configuration File
// Edit this file to update content and image paths easily

const CONFIG = {
    // Site Information
    site: {
        title: "OpenShift Learning Hub",
        subtitle: "Master OpenShift concepts with detailed explanations and YAML examples",
        footer: "OpenShift Learning Hub - Master OpenShift Concepts"
    },

    // Image Paths - Update these paths when you change images
    images: {
        ocCommandFlow: "images/oc-command-flow.png",
        hcpArchitecture: "images/hcp-architecture.png",
        hubClusterOperators: "images/hub-cluster-operators.png",
        virtualizationDiagram: "images/virtualization-architecture.png",
        networkingDiagram: "images/networking-flow.png"
    },

    // Color Theme - Customize your color scheme
    colors: {
        light: {
            primary: "#4A90E2",        // Soft Blue
            secondary: "#2ECC71",      // Emerald Green
            accent: "#9B59B6",         // Soft Purple
            success: "#27AE60",        // Green
            warning: "#F39C12",        // Orange
            danger: "#E74C3C"          // Red
        },
        dark: {
            primary: "#5DADE2",        // Lighter Blue
            secondary: "#58D68D",      // Lighter Green
            accent: "#BB8FCE",         // Lighter Purple
            success: "#52BE80",        // Lighter Green
            warning: "#F8C471",        // Lighter Orange
            danger: "#EC7063"          // Lighter Red
        }
    },

    // Content Sections - Add or remove sections here
    sections: [
        { id: "architecture", title: "Architecture", icon: "fa-project-diagram" },
        { id: "oc-command", title: "OC Command Flow", icon: "fa-terminal" },
        { id: "configmap", title: "ConfigMap", icon: "fa-cog", hasYaml: true },
        { id: "secrets", title: "Secrets", icon: "fa-key", hasYaml: true },
        { id: "resource-quotas", title: "Resource Quotas", icon: "fa-chart-pie", hasYaml: true },
        { id: "limit-ranges", title: "Limit Ranges", icon: "fa-ruler", hasYaml: true },
        { id: "scc", title: "SCC", icon: "fa-shield-alt", hasYaml: true },
        { id: "network-policy", title: "Network Policy", icon: "fa-network-wired", hasYaml: true },
        { id: "service-accounts", title: "Service Accounts", icon: "fa-user-shield", hasYaml: true },
        { id: "networking", title: "Networking", icon: "fa-sitemap", detailed: true },
        { id: "hcp", title: "HCP", icon: "fa-cloud" },
        { id: "acm", title: "ACM", icon: "fa-globe" },
        { id: "olm", title: "OLM", icon: "fa-box" },
        { id: "cvo", title: "CVO", icon: "fa-sync-alt" },
        { id: "machine-config", title: "Machine Config", icon: "fa-server" },
        { id: "virtualization", title: "Virtualization", icon: "fa-desktop" }
    ],

    // Networking Details - Detailed networking concepts
    networking: {
        concepts: [
            {
                title: "Pod and Service Communication",
                points: [
                    "Pod IPs are ephemeral - they can change when pods are recreated",
                    "ClusterIP services provide stable endpoints that never change",
                    "Endpoints contain all Pod IPs and are automatically updated",
                    "Communication to pods should always go through ClusterIP services"
                ]
            },
            {
                title: "Service Types",
                points: [
                    "ClusterIP: Only accessible within the cluster (default)",
                    "NodePort: Exposes service on each node's IP at a static port",
                    "LoadBalancer: Exposes service externally using cloud provider's load balancer",
                    "ExternalIP: Exposes service on specific external IPs"
                ]
            },
            {
                title: "Request Flow",
                description: "User → Browser (HTTPS) → Physical Load Balancer → HAProxy (Router) → Pods",
                details: "Service updates endpoints which are read by HAProxy to route traffic"
            }
        ],

        tls: {
            types: [
                {
                    name: "Edge Termination",
                    flow: "URL → Browser (encrypted) → HAProxy (decrypts) → Pod (HTTP)",
                    description: "TLS is terminated at the router, traffic to pod is unencrypted",
                    layer: "Layer 7 (Application Layer)"
                },
                {
                    name: "Re-encrypt",
                    flow: "URL → Browser (encrypted) → HAProxy (decrypt & re-encrypt) → Pod (HTTPS)",
                    description: "TLS is terminated at router and re-encrypted to the pod",
                    layer: "Layer 7 (Application Layer)"
                },
                {
                    name: "Passthrough",
                    flow: "URL → Browser (encrypted) → HAProxy (no decryption) → Pod (HTTPS)",
                    description: "Encrypted traffic passes through router without decryption",
                    layer: "Layer 4 (Transport Layer) - Faster than Layer 7"
                }
            ]
        },

        metalLB: {
            description: "MetalLB provides load balancer implementation for bare metal Kubernetes clusters",
            modes: [
                {
                    name: "Layer 2 Mode (L2Advertisement)",
                    how: "Uses ARP (Address Resolution Protocol) to announce IP-to-MAC mappings",
                    limitation: "Only one node handles all traffic (potential bottleneck)",
                    components: ["IP Address Pool", "L2Advertisement", "Speaker (on each node)"]
                },
                {
                    name: "BGP Mode",
                    how: "Uses Border Gateway Protocol for dynamic routing decisions",
                    advantage: "Traffic distributed across multiple nodes",
                    components: ["IP Address Pool", "BGP Advertisement", "BGP Peers", "FRR (routing daemon)"]
                }
            ]
        },

        multus: {
            description: "Multus CNI enables attaching multiple network interfaces to pods",
            primary: "OVN-Kubernetes handles main pod networking (eth0)",
            secondary: "Multus adds additional interfaces (eth1, eth2, etc.)",
            useCases: [
                {
                    name: "OpenShift Virtualization",
                    reason: "VMs in pods need direct network access from outside the cluster"
                },
                {
                    name: "High-Performance Workloads",
                    reason: "Dedicated 10Gbps NIC for specific pods requiring high throughput"
                },
                {
                    name: "Network Isolation",
                    reason: "Separate management and data plane networks"
                }
            ],
            components: ["NAD (NetworkAttachmentDefinition)", "IPAM (IP Address Management)", "Bridge types (Linux Bridge, OVN Bridge, MACVLAN, IPVLAN)"]
        }
    },

    // Operator Descriptions
    operators: {
        hcp: {
            description: "Hosted Control Planes run control plane components on a separate hosting cluster",
            benefits: [
                "Cost Reduction: No dedicated master nodes per cluster",
                "Faster Provisioning: Clusters created in minutes",
                "Better Multi-tenancy: Isolated control planes",
                "Simplified Management: Centralized control plane management"
            ],
            components: ["MCE (Multicluster Engine)", "HyperShift Operator", "MetalLB", "ODF", "OpenShift Virtualization"]
        },
        acm: {
            description: "Advanced Cluster Management provides end-to-end multi-cluster management",
            features: [
                "Multi-cluster Management: Manage hundreds of clusters from single console",
                "Application Lifecycle: Deploy applications across clusters",
                "Governance & Risk: Policy-based compliance",
                "Observability: Centralized monitoring and logging"
            ]
        },
        olm: {
            description: "Operator Lifecycle Manager manages Kubernetes operators",
            concepts: [
                "Operator: Method of packaging and deploying Kubernetes applications",
                "Catalog: Repository of operator metadata",
                "Subscription: Tracks operator updates in a channel",
                "InstallPlan: Calculated list of resources to create",
                "CSV: ClusterServiceVersion with operator metadata"
            ]
        },
        cvo: {
            description: "Cluster Version Operator manages cluster lifecycle and updates",
            responsibilities: [
                "Orchestrates cluster updates",
                "Ensures cluster operators are healthy",
                "Manages rollbacks if updates fail",
                "Reports cluster version status"
            ]
        },
        machineConfig: {
            description: "Machine Config Operator manages OS-level configuration for nodes",
            components: [
                "MachineConfig: Defines OS configuration (files, systemd units, kernel args)",
                "MachineConfigPool: Groups nodes for configuration",
                "MachineConfigDaemon: Applies configs and handles reboots",
                "ContainerRuntimeConfig: Configures CRI-O runtime"
            ]
        },
        virtualization: {
            description: "OpenShift Virtualization runs virtual machines alongside containers",
            features: [
                "Run VMs and containers on same platform",
                "Manage VMs using Kubernetes APIs",
                "Live migration of VMs between nodes",
                "VM templates and cloning",
                "Integration with OpenShift networking and storage"
            ],
            based_on: "KubeVirt technology"
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
