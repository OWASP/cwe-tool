<p align="center"><h1 align="center">
 ⚠️ IMPORTANT NOTICE ⚠️
  </h1>
</p>
  
<p align="center">
    This project gratuated into the OWASP family and is now managed at <a href="https://github.com/OWASP/cwe-tool">OWASP/cwe-tool</a>
</p>

---

<p align="center"><h1 align="center">
  cwe-tool
</h1>

<p align="center">
  A command line CWE discovery tool based on OWASP / CAPSEC database of Common Weakness Enumeration.
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/cwe-tool"><img src="https://badgen.net/npm/v/cwe-tool" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/cwe-tool"><img src="https://badgen.net/npm/license/cwe-tool" alt="license"/></a>
  <a href="https://www.npmjs.org/package/cwe-tool"><img src="https://badgen.net/npm/dt/cwe-tool" alt="downloads"/></a>
  <a href="https://github.com/lirantal/cwe-tool/actions?workflow=CI"><img src="https://github.com/lirantal/cwe-tool/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/lirantal/cwe-tool"><img src="https://badgen.net/codecov/c/github/lirantal/cwe-tool" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/lirantal/cwe-tool"><img src="https://snyk.io/test/github/lirantal/cwe-tool/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# Install

## Executable with Node.js tooling

If you have a Node.js environment, you can invoke `cwe-tool` using the npx tool as follows:

```bash
npx cwe-tool [...command-line options...]
```

## Docker

TBD (❌ PRs welcome)

# Usage

The CWE Tool output is JSON to allow processing of the data or later investigations.

Command-line options blueprint:

| command-line argument | description                                                                                         | implemented    |
| --------------------- | --------------------------------------------------------------------------------------------------- | -------------- |
| `--id`                | Get a CWE data by its ID.                                                                           | ✅             |
| `--parent-id`         | When both `--id` and `--parent-id` are provided, returns only CWE ids which satisfy the parent id.  | ✅ PRs welcome |
| `--indirect`          | When specified along with `--parent-id`, retrieves all indirect parents up to the root of the tree. | ✅             |
| `--search`            | String search returns all the matching CWEs titles                                                  | ✅             |
| `--show-membership`   | Returns all the CWE IDs along with their CWE Category membership relations                          | ❌ PRs welcome |

# Example

## Get CWE By ID

```bash
npx cwe-tool --id 22
```

## Filter for CWE IDs that satisfy a parent relationship

The following command filters all CWE IDs based on whether they satisfy any direct or indirect relationship across the tree to a given parent ID.

```bash
npx cwe-tool --id 22 --parent-id 167 --indirect
```

The output is the following JSON:

```json
{
  "attr": {
    "@_ID": "242",
    "@_Name": "Use of Inherently Dangerous Function",
    "@_Abstraction": "Base",
    "@_Structure": "Simple",
    "@_Status": "Draft"
  },
  "Description": "The program calls a function that can never be guaranteed to work safely.",
  "Extended_Description": "Certain functions behave in dangerous ways regardless of how they are used. Functions in this category were often implemented without taking security concerns into account. The gets() function is unsafe because it does not perform bounds checking on the size of its input. An attacker can easily send arbitrarily-sized input to gets() and overflow the destination buffer. Similarly, the &gt;&gt; operator is unsafe to use when reading into a statically-allocated character array because it does not perform bounds checking on the size of its input. An attacker can easily send arbitrarily-sized input to the &gt;&gt; operator and overflow the destination buffer.",
  "Related_Weaknesses": {
    "Related_Weakness": {
      "attr": {
        "@_Nature": "ChildOf",
        "@_CWE_ID": "1177",
        "@_View_ID": "1000",
        "@_Ordinal": "Primary"
      }
    }
  },
  "Weakness_Ordinalities": { "Weakness_Ordinality": { "Ordinality": "Primary" } },
  "Applicable_Platforms": {
    "Language": [
      { "attr": { "@_Name": "C", "@_Prevalence": "Undetermined" } },
      { "attr": { "@_Name": "C++", "@_Prevalence": "Undetermined" } }
    ]
  },
  "Modes_Of_Introduction": { "Introduction": { "Phase": "Implementation" } },
  "Likelihood_Of_Exploit": "High",
  "Common_Consequences": { "Consequence": { "Scope": "Other", "Impact": "Varies by Context" } },
  "Potential_Mitigations": {
    "Mitigation": [
      {
        "Phase": ["Implementation", "Requirements"],
        "Description": "Ban the use of dangerous functions. Use their safe equivalent."
      },
      {
        "Phase": "Testing",
        "Description": "Use grep or static analysis tools to spot usage of dangerous functions."
      }
    ]
  },
  "Demonstrative_Examples": {
    "Demonstrative_Example": [
      {
        "Intro_Text": "The code below calls gets() to read information into a buffer.",
        "Example_Code": {
          "attr": { "@_Nature": "bad", "@_Language": "C" },
          "xhtml:div": { "#text": "char buf[BUFSIZE];gets(buf);", "xhtml:br": "" }
        },
        "Body_Text": "The gets() function in C is inherently unsafe."
      },
      {
        "attr": { "@_Demonstrative_Example_ID": "DX-5" },
        "Intro_Text": "The code below calls the gets() function to read in data from the command line.",
        "Example_Code": {
          "attr": { "@_Nature": "bad", "@_Language": "C" },
          "xhtml:div": {
            "#text": "}",
            "xhtml:div": {
              "#text": "char buf[24];printf(\"Please enter your name and press &lt;Enter&gt;\\n\");gets(buf);...",
              "attr": { "@_style": "margin-left:10px;" },
              "xhtml:br": ["", "", ""]
            }
          }
        },
        "Body_Text": "However, the programmer uses the function gets() which is inherently unsafe because it blindly copies all input from STDIN to the buffer without checking size. This allows the user to provide a string that is larger than the buffer size, resulting in an overflow condition."
      }
    ]
  },
  "Taxonomy_Mappings": {
    "Taxonomy_Mapping": [
      {
        "attr": { "@_Taxonomy_Name": "7 Pernicious Kingdoms" },
        "Entry_Name": "Dangerous Functions"
      },
      {
        "attr": { "@_Taxonomy_Name": "CERT C Secure Coding" },
        "Entry_ID": "POS33-C",
        "Entry_Name": "Do not use vfork()",
        "Mapping_Fit": "CWE More Abstract"
      },
      {
        "attr": { "@_Taxonomy_Name": "Software Fault Patterns" },
        "Entry_ID": "SFP3",
        "Entry_Name": "Use of an improper API"
      }
    ]
  },
  "References": {
    "Reference": [
      { "attr": { "@_External_Reference_ID": "REF-6" } },
      {
        "attr": { "@_External_Reference_ID": "REF-194", "@_Section": "Chapter 5. Working with I/O" }
      },
      {
        "attr": {
          "@_External_Reference_ID": "REF-7",
          "@_Section": "Chapter 5, &#34;gets and fgets&#34; Page 163"
        }
      }
    ]
  },
  "Content_History": {
    "Submission": { "Submission_Name": "7 Pernicious Kingdoms", "Submission_Date": "2006-07-19" },
    "Modification": [
      {
        "Modification_Name": "Sean Eidemiller",
        "Modification_Organization": "Cigital",
        "Modification_Date": "2008-07-01",
        "Modification_Comment": "added/updated demonstrative examples"
      },
      {
        "Modification_Name": "Eric Dalci",
        "Modification_Organization": "Cigital",
        "Modification_Date": "2008-07-01",
        "Modification_Comment": "updated Potential_Mitigations"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2008-09-08",
        "Modification_Comment": "updated Applicable_Platforms, Relationships, Other_Notes, Taxonomy_Mappings, Type, Weakness_Ordinalities"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2008-11-24",
        "Modification_Comment": "updated Relationships, Taxonomy_Mappings"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2009-10-29",
        "Modification_Comment": "updated Description, Other_Notes, References"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2010-02-16",
        "Modification_Comment": "updated Demonstrative_Examples, References, Relationships"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2010-04-05",
        "Modification_Comment": "updated Relationships"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2011-06-01",
        "Modification_Comment": "updated Common_Consequences"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2011-06-27",
        "Modification_Comment": "updated Common_Consequences"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2012-05-11",
        "Modification_Comment": "updated Relationships"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2012-10-30",
        "Modification_Comment": "updated Potential_Mitigations"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2014-07-30",
        "Modification_Comment": "updated Demonstrative_Examples, Relationships, Taxonomy_Mappings"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2017-11-08",
        "Modification_Comment": "updated Causal_Nature, References, Relationships, Taxonomy_Mappings"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2018-03-27",
        "Modification_Comment": "updated References"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2019-01-03",
        "Modification_Comment": "updated Relationships"
      },
      {
        "Modification_Name": "CWE Content Team",
        "Modification_Organization": "MITRE",
        "Modification_Date": "2020-02-24",
        "Modification_Comment": "updated References, Relationships"
      }
    ],
    "Previous_Entry_Name": [
      { "#text": "Dangerous Functions", "attr": { "@_Date": "2008-01-30" } },
      { "#text": "Use of Inherently Dangerous Functions", "attr": { "@_Date": "2008-04-11" } }
    ]
  }
}
```

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**cwe-tool** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
