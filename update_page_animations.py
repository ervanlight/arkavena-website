import re

with open('/Users/macbook/kontraktor-website/src/app/page.tsx', 'r') as f:
    content = f.read()

# Add import
if "import { FadeIn }" not in content:
    content = content.replace(
        "import { ProjectCard } from '@/components/sections/project-card';",
        "import { ProjectCard } from '@/components/sections/project-card';\nimport { FadeIn } from '@/components/shared/fade-in';"
    )

# Wrap Hero
content = content.replace(
    '<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">',
    '<FadeIn>\n          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">'
)
content = content.replace(
    '<HeroPanel />\n            </div>\n          </div>\n        </Container>',
    '<HeroPanel />\n            </div>\n          </div>\n          </FadeIn>\n        </Container>'
)

# Wrap Services
content = content.replace(
    '<div className="text-center max-w-3xl mx-auto mb-16">',
    '<FadeIn>\n          <div className="text-center max-w-3xl mx-auto mb-16">'
)
content = content.replace(
    '</Link>\n                </Button>\n              </div>\n            </div>\n          </div>\n        </Container>',
    '</Link>\n                </Button>\n              </div>\n            </div>\n          </div>\n          </FadeIn>\n        </Container>'
)

# Wrap Anxieties
content = content.replace(
    '<div className="max-w-3xl mb-16">',
    '<FadeIn>\n          <div className="max-w-3xl mb-16">'
)
content = content.replace(
    '<p className="text-[#68757D] text-sm leading-relaxed">{item.desc}</p>\n              </div>\n            ))}\n          </div>\n        </Container>',
    '<p className="text-[#68757D] text-sm leading-relaxed">{item.desc}</p>\n              </div>\n            ))}\n          </div>\n          </FadeIn>\n        </Container>'
)

# Wrap Controlled Delivery
content = content.replace(
    '<SectionHeader \n            title="Satu sistem untuk mengendalikan proyek dari awal hingga serah terima."',
    '<FadeIn>\n          <SectionHeader \n            title="Satu sistem untuk mengendalikan proyek dari awal hingga serah terima."'
)
content = content.replace(
    '<p className="text-[#68757D] text-sm leading-relaxed">{pillar.desc}</p>\n                </div>\n              </div>\n            ))}\n          </div>\n        </Container>',
    '<p className="text-[#68757D] text-sm leading-relaxed">{pillar.desc}</p>\n                </div>\n              </div>\n            ))}\n          </div>\n          </FadeIn>\n        </Container>'
)

with open('/Users/macbook/kontraktor-website/src/app/page.tsx', 'w') as f:
    f.write(content)

print("Page updated with FadeIn")
