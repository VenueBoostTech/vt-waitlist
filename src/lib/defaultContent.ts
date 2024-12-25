// lib/defaultContent.ts
export const defaultTemplateContent = {
    header: {
      title: "Transform Video into Business Intelligence",
      subtitle: "Build anticipation and collect leads with customizable waitlist pages.",
      alignment: 'left',
      showSubtitle: true,
    },
    features: [
      {
        id: '1',
        title: "Enterprise-Grade Intelligence",
        description: "Transform your surveillance into actionable insights with powerful AI-driven analytics.",
        icon: "🎯"
      },
      {
        id: '2',
        title: "Industry-Specific Solutions",
        description: "Tailored video intelligence for various sectors.",
        icon: "🏢"
      },
      {
        id: '3',
        title: "Advanced Security & Integration",
        description: "Enterprise-grade security with seamless integration.",
        icon: "🔒"
      }
    ],
    form: {
      title: "Get Early Access",
      subtitle: "Join leading enterprises transforming their operations 🚀",
      fields: [
        {
          id: '1',
          type: "text",
          label: "Full Name",
          placeholder: "Your full name...",
          required: true
        },
        {
          id: '2',
          type: "email",
          label: "Email",
          placeholder: "Work email address...",
          required: true
        },
        {
          id: '3',
          type: "select",
          label: "How did you hear about us?",
          placeholder: "Select an option",
          required: true,
          options: ["Google", "Twitter", "Friend", "Other"]
        }
      ],
      submitButton: {
        text: "Request Early Access",
        style: {
          backgroundColor: "#2563eb"
        }
      }
    },
    style: {
      colors: {
        primary: "#2563eb",
        text: "#111827",
        background: "#ffffff"
      },
      spacing: "relaxed",
      borderRadius: "lg",
      font: "font-sans"
    }
  }