import cls from "./Table.module.scss";
import { memo } from "react";

export const Table = memo((props) => {
  const { rows } = props;
  if (!rows.length) {
    return null;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>University name</th>
          <th>Country code</th>
          <th>Domains</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((u) => (
          <tr key={u.name}>
            <td>{u.name}</td>
            <td>{u.alpha_two_code}</td>
            <td>
              {u.domains.map((d) => (
                <a key={d} href={`https://${d}`} target="_blank">
                  {" "}
                  {d}{" "}
                </a>
              ))}
            </td>
            <td>{}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
