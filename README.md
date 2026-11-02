# OpenShift Learning Hub

A modern, minimalistic website for learning OpenShift (OCP) concepts with detailed explanations and YAML examples.

## Features

- 🎨 **Modern Design**: Clean, minimalistic interface with smooth animations
- 🌓 **Dark/Light Theme**: Toggle between dark and light modes (persists in localStorage)
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search**: Quick search functionality to find topics
- 📋 **Copy Code**: One-click copy for all YAML examples
- ⌨️ **Keyboard Shortcuts**: Fast navigation with keyboard shortcuts
- 🖼️ **Editable Images**: All diagrams use local file paths for easy updates

## Topics Covered

1. **OpenShift Architecture** - Overview of control plane and worker nodes
2. **OC Command Flow** - How the oc command interacts with the cluster
3. **ConfigMap** - Configuration management
4. **Secrets** - Sensitive data management
5. **Resource Quotas** - Resource consumption limits
6. **Limit Ranges** - Default resource constraints
7. **Security Context Constraints (SCC)** - Pod security policies
8. **Network Policy** - Pod-level firewall rules
9. **Service Accounts** - Identity for pods
10. **OpenShift Networking** - Services, Routes, Ingress
11. **Hosted Control Planes (HCP)** - Cost-effective cluster management
12. **Advanced Cluster Management (ACM)** - Multi-cluster management
13. **Operator Lifecycle Manager (OLM)** - Operator management
14. **Cluster Version Operator (CVO)** - Cluster updates and versioning
15. **Machine Config Operator** - OS-level configuration
16. **OpenShift Virtualization** - Running VMs alongside containers

## File Structure

```
claude/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── config.js           # information
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Keyboard Shortcuts

- **`T`** - Toggle dark/light theme
- **`Ctrl + K`** (or `Cmd + K` on Mac) - Focus search box
- **`Esc`** - Close mobile menu



## Browser Compatibility

- ✅ Chrome Latest
- ✅ Firefox latest
- ✅ Safari latest
- ✅ Edge latest

## Features in Detail

### Theme Toggle
- Automatic persistence using localStorage
- Smooth transition between themes
- Respects system preference on first visit (can be enhanced)

### Code Copy
- One-click copy to clipboard
- Visual feedback with checkmark
- Error handling for unsupported browsers

### Smooth Scrolling
- Automatic active section highlighting
- Smooth scroll to sections
- Mobile-friendly navigation

### Search
- Real-time filtering of navigation items
- Keyboard accessible
- Case-insensitive matching


## Performance

- Optimized CSS with minimal dependencies
- Lazy loading for images (can be added)
- Throttled scroll events
- Minimal JavaScript footprint
- No external dependencies except Font Awesome

## Accessibility

- Semantic HTML5
- ARIA labels (can be enhanced)
- Keyboard navigation
- High contrast support
- Screen reader friendly (can be enhanced)


## Tips

1. **Bookmark Sections**: Right-click any section heading and bookmark it directly
2. **Print**: Use Ctrl+P for a print-friendly version
3. **Mobile**: Works great on mobile devices with swipe navigation
4. **Offline**: Save the entire folder and use offline

---

**Created with**: HTML5, CSS3, Vanilla JavaScript  
**Icons**: Font Awesome 6.0  
**No frameworks required** - Pure, lightweight code
